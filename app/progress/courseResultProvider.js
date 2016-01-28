define(['constants'], function (constants) {
    "use strict";

    return {
        getResult: getResult
    };

    function getResult(courseId, createdOn) {
        var key = constants.course.resultStorageKey + courseId,
            result = null;
            
        try {
            result = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.log('Unable to restore course result from localStorage');
        }

        return result;
    }
});