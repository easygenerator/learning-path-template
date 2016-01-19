define(['constants', 'data/dataContext', 'durandal/app'], function (constants, dataContext, app) {
    "use strict";

    return {
        startTracking: startTracking
    };

    function startTracking() {
        $(window).bind('storage', function (event) {
            if (!event.originalEvent)
                return;

            var key = event.originalEvent.key,
                value = event.originalEvent.newValue,
                result;

            var courses = dataContext.learningPath.entities.filter(function (item) {
                var expectedKey = constants.course.resultStorageKey + item.id + item.createdOn;
                return key === expectedKey;
            });

            if (courses.length < 1)
                return;

            if (!value)
                return;

            try {
                result = JSON.parse(value);
            } catch (e) {
                console.log('Unable to receive course result from localStorage');
                return;
            }

            app.trigger(constants.events.course.resultStorageEntryUpdated, courses[0].id, result);
        });
    }
});