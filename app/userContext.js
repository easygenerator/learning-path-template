define([], function () {
    var self = {
        currentUser: null
    },
        context = {
            init: init,
            getCurrentUser: getCurrentUser
        }
    ;

    return context;

    function getCurrentUser() {
        return self.currentUser;
    }

    function init() {
        return Q.fcall(function () {
            var username = getQueryStringValue('name'),
                email = getQueryStringValue('email');

            if (username || email) {
                self.currentUser = { username: username, email: email };
            }
        });
    }

    function getQueryStringValue(key) {
        var urlParams = window.location.search;
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var results = regex.exec(urlParams);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
});