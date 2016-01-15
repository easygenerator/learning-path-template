define(['constants'], function (constants) {
    "use strict";

    function LearningPath (id, title, createdOn, entities) {
        var that = {
            id: id,
            title: title,
            createdOn: createdOn,
            entities: entities,
            getScore: getScore,
            getCompletedCoursesCount: getCompletedCoursesCount,
            getProgressTrackableCoursesCount: getProgressTrackableCoursesCount
        };

        return that;

        function getScore() {
            var progressTrackableCoursesCount = getProgressTrackableCoursesCount();
            if (progressTrackableCoursesCount === 0) {
                return 0;
            }

            return Math.floor(getCompletedCoursesCount() * 100 / progressTrackableCoursesCount);
        }

        function getProgressTrackableCoursesCount() {
            var coursesCount = 0;
            that.entities.forEach(function (entity) {
                if (entity.progressTrackable) {
                    coursesCount++;
                }
            });

            return coursesCount;
        }

        function getCompletedCoursesCount() {
            var coursesCount = 0;
            that.entities.forEach(function (entity) {
                if (entity.progressTrackable && entity.status === constants.course.statuses.completed) {
                    coursesCount++;
                }
            });

            return coursesCount;
        }
    };

    return LearningPath;
});