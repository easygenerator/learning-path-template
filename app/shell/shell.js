define(['durandal/app', 'data/dataContext', 'progress/courseResultTracker', 'plugins/router', 'routing/routes', 'userContext', 'xApi/xApi', 'templateSettings', 'progress/progressContext',
    'progress/localStorageProgressProvider', 'constants'],
    function (app, dataContext, courseResultTracker, router, routes, userContext, xApi, templateSettings, progressContext, progressStorage, constants) {
        'use strict';

        var viewModel = {
            isError: ko.observable(false),
            activate: activate,
            router: router,
            isClosed: ko.observable(false)            
        };

        viewModel.cssName = ko.computed(function() {
            var activeItem = router.activeItem();
            if (_.isObject(activeItem)) {
                var moduleId = activeItem.__moduleId__;
                moduleId = moduleId.slice(moduleId.lastIndexOf('/') + 1);
                return moduleId;
            }
            return '';
        });

        viewModel.requireAuthentication = ko.computed(function () {
            return templateSettings.xApi.enabled && xApi.enabled() && !xApi.currentUser();
        });

        return viewModel;

        function activate() {
            app.on(constants.events.app.closed).then(function () {
                viewModel.isClosed(true);
            });

            return dataContext.init().then(function () {
                return userContext.init().then(function () {
                    // progress
                    progressStorage.init();
                    progressContext.init(progressStorage);
                    courseResultTracker.startTracking();
                    
                    //
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