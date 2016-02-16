define(['durandal/app', 'constants'],
    function (app, constants) {

        "use strict";

        var
            windowOperations = {
                close: close
            };

        return windowOperations;

        function close() {
            window.close();
            app.trigger(constants.events.app.closed);
            if (!inIframe()) {
                _.delay(function () {
                    window.alert("Thank you, you can close the page now");
                }, 100);
            }
        }
        
        function inIframe() {
            // browsers can block access to window.top due to same origin policy, so exception can be thrown here.
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        }
    }
);