define(['constants'], function (constants) {
    "use strict";

    return {
        getProgress: getProgress
    };

    function getProgress(courseId, createdOn) {
        var key = constants.course.progressStorageKey + courseId + createdOn,
            progress = null;
        try {
            progress = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.log('Unable to restore progress from localStorage');
        }

        return progress;
    }
});