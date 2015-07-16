define([], function () {
    "use strict";

    var ctor = function (title, link) {
        this.title = title;
        this.link = link;
        this.thumbnailUrl = '';
        this.isComplete = false;
        this.score = 0;
    };

    return ctor;
});