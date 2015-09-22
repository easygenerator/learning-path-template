define(['durandal/app', 'knockout', 'plugins/router', 'eventManager', 'userContext', 'xApi/xApi', 'templateSettings', 'constants'],
    function (app, ko, router, eventManager, userContext, xApi, templateSettings, constants) {
        "use strict";
        var emailPattern = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,6})+)$/;

        var viewModel = {
            activate: activate,

            usermail: usermail(),
            username: username(),

            allowToSkip: !templateSettings.xApi.required,

            skip: skip,
            login: login
        };

        return viewModel;

        function usermail() {
            var value = ko.observable('');
            value.trim = function () {
                value(ko.utils.unwrapObservable(value).trim());
            };
            value.isValid = ko.computed(function () {
                return !!value() && emailPattern.test(value().trim());
            });
            value.isModified = ko.observable(false);
            value.markAsModified = function () {
                value.isModified(true);
                return value;
            };
            return value;
        }

        function username() {
            var value = ko.observable('');
            value.trim = function () {
                value(ko.utils.unwrapObservable(value).trim());
            };
            value.isValid = ko.computed(function () {
                return !!value() && !!value().trim();
            });
            value.isModified = ko.observable(false);
            value.markAsModified = function () {
                value.isModified(true);
                return value;
            };
            return value;
        };

        function skip() {
            if (!viewModel.allowToSkip) {
                return;
            }
            app.trigger(constants.events.user.authenticationSkipped);
            xApi.stopReporting();
            startLearningPath();
        };

        function login() {
            if (viewModel.usermail.isValid() && viewModel.username.isValid()) {
                var username = viewModel.username();
                var email = viewModel.usermail();
                xApi.startReporting(username, email);
                app.trigger(constants.events.user.authenticated, { username: username, email: email });
                startLearningPath();
            }
            else {
                showValidationMessages();
            }
        };

        function showValidationMessages() {
            viewModel.usermail.markAsModified();
            viewModel.username.markAsModified();
        }

        function startLearningPath() {
            eventManager.learningPathStarted();
            router.navigate('');
        };

        function activate() {
            var user = userContext.getCurrentUser();

            if (user) {
                viewModel.username(user.username);
                viewModel.usermail(user.email);
                showValidationMessages();
            }
        };
    });