define(['data/dataContext', 'data/courseResultTracker', 'plugins/router', 'routing/routes'], function (dataContext, courseResultTracker, router, routes) {
    'use strict';

    var viewModel = {
        isError: ko.observable(false),
        activate: activate
    };

    return viewModel;

    function activate() {
        return dataContext.init()
            .then(function () {
                courseResultTracker.startTracking();
                return router.map(routes).buildNavigationModel().activate();
            })
            .fail(function () {
                viewModel.isError(true);
            });
    }
});