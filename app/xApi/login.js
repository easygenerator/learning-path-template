define(['knockout', 'data/dataContext'],
    function (ko, dataContext) {

        "use strict";
        var viewModel = {
            activate: activate,
            
            title: "\"" + dataContext.learningPath.title + "\""

            //usermail: usermail(),
            //username: username(),

            //allowToSkip: ko.observable(false),

            //skip: skip,
            //login: login
        };

        return viewModel;

        //function usermail() {
        //    var value = ko.observable('');
        //    value.trim = function () {
        //        value(ko.utils.unwrapObservable(value).trim());
        //    };
        //    value.isValid = ko.computed(function () {
        //        return !!value() && viewConstants.patterns.email.test(value().trim());
        //    });
        //    value.isModified = ko.observable(false);
        //    value.markAsModified = function () {
        //        value.isModified(true);
        //        return value;
        //    };
        //    return value;
        //}

        //function username() {
        //    var value = ko.observable('');
        //    value.trim = function () {
        //        value(ko.utils.unwrapObservable(value).trim());
        //    };
        //    value.isValid = ko.computed(function () {
        //        return !!value() && !!value().trim();
        //    });
        //    value.isModified = ko.observable(false);
        //    value.markAsModified = function () {
        //        value.isModified(true);
        //        return value;
        //    };
        //    return value;
        //};

        //function skip() {
        //    if (!viewModel.allowToSkip()) {
        //        return;
        //    }

        //    xApiInitializer.deactivate();
        //    startCourse();
        //};

        //function login() {
        //    if (viewModel.usermail.isValid() && viewModel.username.isValid()) {
        //        xApiInitializer.activate(viewModel.username(), viewModel.usermail()).then(function () {
        //            startCourse();
        //        });
        //    }
        //    else {
        //        showValidationMessages();
        //    }
        //};

        //function showValidationMessages() {
        //    viewModel.usermail.markAsModified();
        //    viewModel.username.markAsModified();
        //}

        //function startCourse() {
        //    eventManager.courseStarted();
        //    router.navigate('');
        //};

        function activate() {
            //var user = userContext.getCurrentUser();

            //if (user) {
            //    viewModel.username(user.username);
            //    viewModel.usermail(user.email);
            //    showValidationMessages();
            //}

            //viewModel.allowToSkip(!xApiSettings.xApi.required);
        };
    });