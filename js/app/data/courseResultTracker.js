define(['constants', 'data/dataContext', 'eventManager'], function (constants, dataContext, eventManager) {
    "use strict";

    return {
        startTracking: startTracking
    };

    function startTracking() {
        $(window).bind('storage', function (event) {
            var e = event.originalEvent;
            if (!e || !e.key || !e.newValue)
                return;

            var newValue;
            try {
                newValue = JSON.parse(e.newValue);
            } catch (e) {
                console.log('Unable to receive course result from localStorage');
                return;
            }

            if (!newValue)
                return;

            var courses = dataContext.learningPath.courses.filter(function (item) {
                var expectedKey = constants.course.resultStorageKey + item.id + item.createdOn;
                return e.key === expectedKey;
            });

            if (courses.length < 1)
                return;

            var course = courses[0];
            course.score = newValue.score;
            course.isComplete = newValue.isComplete;
            eventManager.trigger(constants.events.course.resultChanged, course);
        });
    }
});