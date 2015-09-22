define(['plugins/router'],
    function (router) {
        'use strict';

        return function () {
            var settings = {
                exitButtonVisible: true,
                onlyHorizontalHeader: true,
                progressControlVisible: true,
                headerVisible: true
            };

            var activeInstruction = router.activeInstruction();
            if (_.isObject(activeInstruction)) {
                settings.exitButtonVisible = !activeInstruction.config.hideExitButton;
                settings.onlyHorizontalHeader = activeInstruction.config.onlyHorizontalHeader;
                settings.progressControlVisible = activeInstruction.config.progressControlVisible;
                settings.headerVisible = !activeInstruction.config.hideHeader;
            }
            return settings;
        }
    });