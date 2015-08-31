define(['knockout', 'durandal/app', 'plugins/router', '../xApiInitializer', '../configuration/xApiSettings'],
    function (ko, app, router, xApiInitializer, xApiSettings) {

        var
            navigateBackUrl = '',

            allowToContinue = ko.observable(false);

        restartCourse = function () {
            app.trigger('user:set-progress-clear', function () {
                var rootUrl = location.toString().replace(location.hash, '');
                router.navigate(rootUrl, { replace: true, trigger: true });
            });
        },

        continueLearning = function () {
            if (!allowToContinue()) {
                return;
            }

            xApiInitializer.deactivate();
            router.navigate(navigateBackUrl);
            app.trigger('user:authentication-skipped');
        },

        activate = function (backUrl) {
            navigateBackUrl = backUrl;
            allowToContinue(!xApiSettings.xApi.required);
        };

        return {
            allowToContinue: allowToContinue,
            restartCourse: restartCourse,
            continueLearning: continueLearning,

            activate: activate
        };
    });