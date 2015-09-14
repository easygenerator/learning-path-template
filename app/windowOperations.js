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
            _.delay(function () {
                window.alert("Thank you, you can close the page now");
            }, 100);
        }
    }
);