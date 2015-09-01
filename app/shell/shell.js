define(['data/dataContext', 'data/courseResultTracker', 'plugins/router', 'routing/routes', 'userContext'], function (dataContext, courseResultTracker, router, routes, userContext) {
    'use strict';

    var viewModel = {
        isError: ko.observable(false),
        activate: activate,
        router: router
    };

    viewModel.authenticationRequired = ko.observable(true); // for now always true, later will be taken from the context

    viewModel.hasToAuthenticate = ko.computed(function() {
        return viewModel.authenticationRequired();
    });

    return viewModel;

    function activate() {
        return dataContext.init().then(function () {
                return userContext.init().then(function() {
                    courseResultTracker.startTracking();
                    return router.map(routes).buildNavigationModel().activate();
                });
            })
            .fail(function () {
                viewModel.isError(true);
            });
    }
});