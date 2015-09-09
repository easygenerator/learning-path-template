define(['data/dataContext', 'data/courseResultTracker', 'plugins/router', 'routing/routes', 'userContext', 'xApi/xApi', 'templateSettings'],
    function (dataContext, courseResultTracker, router, routes, userContext, xApi, templateSettings) {
        'use strict';

        var viewModel = {
            isError: ko.observable(false),
            activate: activate,
            router: router
        };
        
        viewModel.authenticated = ko.computed(function () {
            return templateSettings.xApi.enabled && xApi.currentUser();
        });

        return viewModel;

        function activate() {
            return dataContext.init().then(function () {
                return userContext.init().then(function () {
                    courseResultTracker.startTracking();
                    return router.map(routes).buildNavigationModel().activate();
                });
            })
                .fail(function () {
                    viewModel.isError(true);
                });
        }
    });