define(['viewModels/course', 'constants', 'data/dataContext', 'durandal/app'], function (Course, constants, dataContext, app) {
    "use strict";

    var viewModel = {
        courses: [],
        title: '',
        score: ko.observable(0),
        completedCoursesCount: ko.observable(0),
        activate: activate
    };

    return viewModel;

    function activate() {
        viewModel.title = dataContext.learningPath.title;
        viewModel.score(dataContext.learningPath.getScore());
        viewModel.completedCoursesCount(dataContext.learningPath.getCompletedCoursesCount());

        dataContext.learningPath.courses.forEach(function (course) {
            viewModel.courses.push(new Course(course));
        });

        app.on(constants.events.course.resultChanged, function () {
            viewModel.score(dataContext.learningPath.getScore());
            viewModel.completedCoursesCount(dataContext.learningPath.getCompletedCoursesCount());
        });
    }
});