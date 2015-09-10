define(['plugins/router', 'xApi/xApi', 'templateSettings', 'data/dataContext'],
    function (router, xApi, templateSettings, dataContext) {
        var allowToContinue = !templateSettings.xApi.required;
        
        var restartCourse = function() {
            router.navigate('');
        };

        var continueLearning = function() {
            if (!allowToContinue) {
                return;
            }

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