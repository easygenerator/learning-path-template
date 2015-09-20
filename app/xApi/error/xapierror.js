define(['durandal/app', 'plugins/router', 'xApi/xApi', 'templateSettings', 'data/dataContext', 'constants'],
    function (app, router, xApi, templateSettings, dataContext, constants) {
        var allowToContinue = !templateSettings.xApi.required;
        
        var restartPath = function () {
            xApi.restart();

            router.navigate('');
        };

        var continueLearning = function() {
            if (!allowToContinue) {
                return;
            }
            app.trigger(constants.events.user.authenticationSkipped);
            xApi.stopReporting();
            router.navigate('');
        };
      
        return {
            allowToContinue: allowToContinue,
            restartPath: restartPath,
            continueLearning: continueLearning,
            title: dataContext.learningPath.title
        };
    });