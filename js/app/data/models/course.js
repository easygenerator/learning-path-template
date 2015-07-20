define(['durandal/app', 'constants'], function (app, constants) {
    "use strict";

    var ctor = function (title, link) {
        var that = {
            title: title,
            link: link,
            thumbnailUrl: '',
            isComplete: false,
            score: 0
        };

        app.on(constants.events.course.resultStorageEntryUpdated, function (courseId, result) {
            if (courseId != that.id)
                return;

            that.score = result.score;
            that.isComplete = result.isComplete;
            app.trigger(constants.events.course.resultChanged, that);
        });

        return that;
    };

    return ctor;
});