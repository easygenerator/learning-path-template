define(['data/dataContext', 'constants'], function (dataContext, constants) {
    
    var pathProgressKey = null;

    var progressProvider = {
        init: init,
        getProgress: getProgress,
        saveProgress: saveProgress,
        removeProgress: removeProgress
    };

    return progressProvider;

    function init() {
        pathProgressKey = constants.learningPath.progressStorageKey + dataContext.learningPath.id + dataContext.learningPath.createdOn;
    }

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

        // remove results for path's courses.
        dataContext.learningPath.entities.forEach(function (entity) {
            var courseResultKey = constants.course.resultStorageKey + entity.id + entity.createdOn;
            removeProgressByKey(courseResultKey);
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