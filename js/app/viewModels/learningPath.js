define(['viewModels/course', 'constants', 'eventManager', 'data/dataContext'], function (Course, constants, eventManager, dataContext) {
    "use strict";

    var ctor = function () {
        var viewModel = {
            courses: [],
            title: dataContext.learningPath.title,
            score: ko.observable(dataContext.learningPath.getScore()),
            completedCoursesCount: ko.observable(dataContext.learningPath.getCompletedCoursesCount())
        };

        dataContext.learningPath.courses.forEach(function (course) {
            viewModel.courses.push(new Course(course));
        });

        eventManager.on(constants.events.course.resultChanged, function () {
            viewModel.score(dataContext.learningPath.getScore());
            viewModel.completedCoursesCount(dataContext.learningPath.getCompletedCoursesCount());
        });

        return viewModel;
    };

    return ctor;
});