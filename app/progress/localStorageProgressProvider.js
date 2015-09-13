define(['data/dataContext', 'constants'], function (dataContext, constants) {
    var pathProgressKey = constants.learningPath.progressStorageKey + dataContext.learningPath.id + context.learningPath.createdOn;

    var module = {
        progressProvider: {
            getProgress: getProgress,
            saveProgress: saveProgress,
            saveResults: saveResults,
            removeProgress: removeProgress
        }
    }

    return module;

    function getProgress() {
        var progress = {};
        try {
            progress = JSON.parse(localStorage.getItem(pathProgressKey));
        } catch (e) {
            console.log('Unable to restore progress from localStorage');
        }
        return progress;
    }

    function saveProgress(progress) {
        try {
            localStorage.setItem(pathProgressKey, JSON.stringify(progress));
        } catch (e) {
            return false;
        }

        return true;
    }

    function removeProgress() {
        // remove progress for the learning path.
        removeProgressByKey(pathProgressKey);

        // remove progress for path's courses.
        dataContext.learningPath.courses.forEach(function (course) {
            var courseProgressKey = constants.course.progressStorageKey + course.id + course.createdOn;
            removeProgressByKey(courseProgressKey);
        });
    }

    function removeProgressByKey(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.log('Unable to remove progress from localStorage.');
        }
    }
});