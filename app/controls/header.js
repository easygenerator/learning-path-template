define(['data/dataContext', 'plugins/router'],
    function (dataContext, router) {
        'use strict';

        var viewModel = {
            activate: activate,
            title: ko.observable()
        };

        viewModel.viewSettings = function () {
            var settings = {
                exitButtonVisible: true,
                onlyHorizontalHeader: true,
                progressControlVisible: true
            };

            var activeInstruction = router.activeInstruction();
            if (_.isObject(activeInstruction)) {
                settings.exitButtonVisible = !activeInstruction.config.hideExitButton;
                settings.onlyHorizontalHeader = activeInstruction.config.onlyHorizontalHeader;
                settings.progressControlVisible = activeInstruction.config.progressControlVisible;
            }
            return settings;
        }

        function activate() {
            viewModel.title(dataContext.learningPath.title);
        }

        return viewModel;
    });