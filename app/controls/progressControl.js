define(['knockout', 'constants', 'data/dataContext', 'durandal/app'], function (ko, constants, dataContext, app) {
    "use strict";

    var viewModel = {
        score: ko.observable(0),
        completedCoursesCount: ko.observable(0),
        progressTrackableCoursesCount: 0,
        activate: activate
    };

    return viewModel;

    function activate() {
        viewModel.score(dataContext.learningPath.getScore());
        viewModel.completedCoursesCount(dataContext.learningPath.getCompletedCoursesCount());
        viewModel.progressTrackableCoursesCount = dataContext.learningPath.getProgressTrackableCoursesCount();

        app.on(constants.events.course.resultChanged, function () {
            viewModel.score(dataContext.learningPath.getScore());
            viewModel.completedCoursesCount(dataContext.learningPath.getCompletedCoursesCount());
        });
    }
});