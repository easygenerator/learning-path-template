define(['jsonReader'], function (jsonReader) {

    var defaultTemplateSetting = {
        xApi: {
            enabled: true,
            selectedLrs: "default",
            lrs: {
                uri: "//reports.easygenerator.com/xApi/statements",
                credentials: {
                    "username": "",
                    "password": ""
                },
                authenticationRequired: false
            },
            allowedVerbs: ['started', 'stopped', 'passed', 'failed']
        }
    };


    return {
        init: init,
        xApi: {}
    };

    function init() {
        var that = this;
        return jsonReader.read('settings.js').then(function(settings) {
            var fullSettings = _.defaults(settings, defaultTemplateSetting);
            that.xApi = fullSettings.xApi;
        });
    }
});
