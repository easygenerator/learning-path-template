define(['durandal/app', 'constants', 'data/models/entity'], function (app, constants, Entity) {
    "use strict";

    function Course (title, link) {
        var that = this;
        Entity.call(this, title, link, true);
        
        this.thumbnailUrl = '';
        this.status = constants.course.statuses.notAttempted,
        this.score = 0;

        app.on(constants.events.course.resultStorageEntryUpdated, function (courseId, result) {
            if (courseId != that.id)
                return;

            that.score = result.score;
            that.status = result.status;
            app.trigger(constants.events.course.resultChanged, that);
        });
    };

    return Course;
});