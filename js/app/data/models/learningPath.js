define([], function () {
    "use strict";

    var ctor = function (title, courses) {
        var that = {
            title: title,
            courses: courses,
            getScore: getScore,
            getCompletedCoursesCount: getCompletedCoursesCount
        };

        //test data
        setCourseState(that.courses[0], 20, false);
        setCourseState(that.courses[1], 60, true);
        setCourseState(that.courses[2], 100, true);

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
                if (course.isComplete) {
                    completedCoursesCount++;
                }
            });

            return completedCoursesCount;
        }

        function setCourseState(course, score, isComplete) {
            course.score = score;
            course.isComplete = isComplete;
        }
    };

    return ctor;
});