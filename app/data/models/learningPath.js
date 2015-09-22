define(['constants'], function (constants) {
    "use strict";

    var ctor = function (id, title, createdOn, courses) {
        var that = {
            id: id,
            title: title,
            createdOn: createdOn,
            courses: courses,
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
            that.courses.forEach(function (course) {
                if (course.progressTrackable) {
                    coursesCount++;
                }
            });

            return coursesCount;
        }

        function getCompletedCoursesCount() {
            var coursesCount = 0;
            that.courses.forEach(function (course) {
                if (course.progressTrackable && course.status === constants.course.statuses.completed) {
                    coursesCount++;
                }
            });

            return coursesCount;
        }
    };

    return ctor;
});