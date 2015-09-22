define(['durandal/app'],
    function (app) {

        var
            events = {
                learningPathStarted: "learningPathStarted",
                learningPathFinished: "learningPathFinished"
            },

            turnAllEventsOff = function () {
                _.each(events, function (event) {
                    app.off(event);
                });
            },

            subscribeForEvent = function (event) {
                if (!events.hasOwnProperty(event)) {
                    throw 'Unsupported event';
                }

                return app.on(event);
            },

            learningPathStarted = function (data) {
                app.trigger(events.learningPathStarted, data);
            },

            learningPathFinished = function (data, callback) {
                return executeAfterSubscribersDone(events.learningPathFinished, data, callback);
            },

            executeAfterSubscribersDone = function (event, eventData, callback) {
                if (!app.callbacks || !app.callbacks[event]) {
                    return Q.fcall(function () {
                        if (_.isFunction(callback)) {
                            callback();
                        }
                    });
                }

                var promises = [];
                _.each(app.callbacks[event], function (handler) {
                    if (_.isFunction(handler)) {
                        var promise = handler(eventData);

                        if (Q.isPromise(promise)) {
                            promises.push(promise);
                        }
                    }
                });

                return Q.all(promises).then(function () {
                    if (_.isFunction(callback)) {
                        callback();
                    }
                });
            };

        return {
            events: events,
            turnAllEventsOff: turnAllEventsOff,
            subscribeForEvent: subscribeForEvent,

            learningPathStarted: learningPathStarted,
            learningPathFinished: learningPathFinished
        };
    }
);