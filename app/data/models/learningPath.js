define(['constants'], function (constants) {
    "use strict";

    var ctor = function (title, courses) {
        var that = {
            title: title,
            courses: courses,
            getScore: getScore,
            getCompletedCoursesCount: getCompletedCoursesCount
        };

        return that;

        function getScore() {
            if (that.courses.length === 0) {
                return 0;
            }

            return Math.floor(getCompletedCoursesCount() * 100 / that.courses.length);
        }

        function getCompletedCoursesCount() {
            var completedCoursesCount = 0;
            that.courses.forEach(function (course) {
                if (course.status === constants.course.statuses.completed) {
                    completedCoursesCount++;
                }
            });

            return completedCoursesCount;
        }
    };

    return ctor;
});