define(['viewModels/course'], function (Course) {
    "use strict";

    var ctor = function (learningPath) {
        var viewModel = {
            courses: [],
            title: learningPath.title,
            score: learningPath.getScore(),
            completedCoursesCount: learningPath.getCompletedCoursesCount()
        };

        learningPath.courses.forEach(function (course) {
            viewModel.courses.push(new Course(course));
        });

        return viewModel;
    };

    return ctor;
});