define(['knockout', 'data/dataContext', 'eventManager', 'userContext', 'xApi/xApi', 'templateSettings'],
    function (ko, dataContext, eventManager, userContext, xApi, templateSettings) {
        "use strict";
        var emailPattern = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,6})+)$/;

        var viewModel = {
            activate: activate,
            
            title: dataContext.learningPath.title,

            usermail: usermail(),
            username: username(),

            allowToSkip: ko.observable(false),

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
            if (!viewModel.allowToSkip()) {
                return;
            }

            startLearningPath();
        };

        function login() {
            if (viewModel.usermail.isValid() && viewModel.username.isValid()) {
                xApi.startReporting(viewModel.username(), viewModel.usermail()).then(function () {
                    startLearningPath();
                });
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

            viewModel.allowToSkip(!templateSettings.xApi.required);
        };
    });