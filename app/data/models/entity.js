define(['constants'], function (constants) {
    "use strict";

    function Entity(title, link, progressTrackable) {
        this.id = '';
        this.createdOn = null;
        this.title = title;
        this.link = link;
        this.progressTrackable = progressTrackable;
    };

    return Entity;
});