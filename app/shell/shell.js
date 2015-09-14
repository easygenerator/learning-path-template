define(['data/dataContext', 'progress/courseResultTracker', 'plugins/router', 'routing/routes', 'userContext', 'xApi/xApi', 'templateSettings', 'progress/progressContext'],
    function (dataContext, courseResultTracker, router, routes, userContext, xApi, templateSettings, ) {
        'use strict';

        var viewModel = {
            isError: ko.observable(false),
            activate: activate,
            router: router
        };

        viewModel.requireAuthentication = ko.computed(function () {
            return templateSettings.xApi.enabled && xApi.enabled() && !xApi.currentUser();
        });

        return viewModel;

        function activate() {
            return dataContext.init().then(function () {
                return userContext.init().then(function () {
                    progressContext.init();
                    courseResultTracker.startTracking();
                    // xApi
                    if (templateSettings.xApi.enabled) {
                        xApi.init();
                        router.guardRoute = loginGuard;
                    }
                    //
                    return router.map(routes).buildNavigationModel().activate();
                });
            })
                .fail(function () {
                    viewModel.isError(true);
                });
        }

        function loginGuard(instance, instruction) {
            if (instruction.config.route === 'login') {
                if (!viewModel.requireAuthentication()) {
                    return '';
                }
            } else if (viewModel.requireAuthentication()) {
                return 'login';
            }

            return true;
        };
    });