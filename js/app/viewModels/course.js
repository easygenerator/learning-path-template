define([], function () {
    "use strict";

    var ctor = function (course) {
        this.title = course.title;
        this.link = course.link;
        this.thumbnailUrl = course.thumbnailUrl;
        this.isComplete = course.isComplete;
        this.score = course.score;
    };

    return ctor;
});