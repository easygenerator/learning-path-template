define(['constants', 'durandal/app'], function (constants, app) {
    "use strict";

    var ctor = function (course) {
        var viewModel = {
            id: course.id,
            title: course.title,
            link: course.link,
            thumbnailUrl: course.thumbnailUrl,
            isCompleted: ko.observable(course.isCompleted),
            score: ko.observable(course.score)
        };

        app.on(constants.events.course.resultChanged, function (courseData) {
            if (viewModel.id != courseData.id)
                return;

            viewModel.score(courseData.score);
            viewModel.isCompleted(courseData.isCompleted);
        });

        return viewModel;
    };

    return ctor;
});