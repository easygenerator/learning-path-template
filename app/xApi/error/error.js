define(['plugins/router', 'xApi/xApi', 'templateSettings', 'data/dataContext', 'constants'],
    function (router, xApi, templateSettings, dataContext, constants) {
        var allowToContinue = !templateSettings.xApi.required;
        
        var restartCourse = function () {
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
            restartCourse: restartCourse,
            continueLearning: continueLearning,
            title: dataContext.learningPath.title
        };
    });