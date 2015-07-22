define(['durandal/app', 'constants'], function (app, constants) {
    "use strict";

    var ctor = function (title, link) {
        var that = {
            title: title,
            link: link,
            thumbnailUrl: '',
            isCompleted: false,
            score: 0,
            createdOn: undefined
        };

        app.on(constants.events.course.resultStorageEntryUpdated, function (courseId, result) {
            if (courseId != that.id)
                return;

            that.score = result.score;
            that.isCompleted = result.isCompleted;
            app.trigger(constants.events.course.resultChanged, that);
        });

        return that;
    };

    return ctor;
});