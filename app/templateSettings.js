define(['jsonReader'], function (jsonReader) {

    var defaultLrs = {
        uri: "https://reports.easygenerator.com/xApi/",
        credentials: {
            username: "",
            password: ""
        },
        authenticationRequired: false
    };

    var defaultVerbs = ['started', 'stopped', 'passed', 'failed'];

    return {
        init: init,
        xApi: {}
    };

    function init() {
        var that = this;
        return jsonReader.read('settings.js').then(function (settings) {
            if (settings.xApi.selectedLrs === "default") {
                settings.xApi.lrs = defaultLrs;
                settings.xApi.allowedVerbs = defaultVerbs;
            }
            
            that.xApi = settings.xApi;
        });
    }
});
