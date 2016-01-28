define(['constants'], function (constants) {
    "use strict";

    return {
        getResult: getResult
    };

    function getResult(courseId, createdOn) {
        var result = null;
        try {
            var value = localStorage.getItem(constants.course.resultStorageKey + courseId);
            if (!value) {
                value = localStorage.getItem(constants.course.resultStorageKey + courseId + createdOn);
            }

            result = JSON.parse(value);
        } catch (e) {
            console.log('Unable to restore course result from localStorage');
        }

        return result;
    }
});