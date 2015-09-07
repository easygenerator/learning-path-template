define(['jsonReader'], function (jsonReader) {

    var defaultTemplateSetting = {
        xApi: {
            enabled: true,
            required: false,
            selectedLrs: "default",
            lrs: {
                uri: "https://reports.easygenerator.com/xApi/statements",
                credentials: {
                    username: "",
                    password: ""
                },
                authenticationRequired: false
            },
            allowedVerbs: ['started', 'stopped', 'passed', 'failed'],
            version: "1.0.0"
        }
    };


    return {
        init: init,
        xApi: {}
    };

    function init() {
        var that = this;
        return jsonReader.read('settings.js').then(function (settings) {
            var fullSettings = _.defaults(settings, defaultTemplateSetting);
            that.xApi = fullSettings.xApi;
        });
    }
});
