define(['jsonReader'], function (jsonReader) {

    var host = window.location.host;
    var lrsHost = (host.indexOf('localhost') === 0 || host.indexOf('elearning-staging') === 0 || host.indexOf('elearning-branches') === 0) ? 'reports-staging.easygenerator.com' : 'reports.easygenerator.com';

    var defaultLrs = {
        uri: "https://" + lrsHost + "/xApi/",
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
