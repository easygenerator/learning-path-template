define(['constants', 'durandal/app'], function (constants, app) {
    "use strict";

    var ctor = function (course) {
        var viewModel = {
            id: course.id,
            title: course.title,
            link: course.link,
            thumbnailUrl: course.thumbnailUrl,
            isComplete: ko.observable(course.isComplete),
            score: ko.observable(course.score)
        };

        app.on(constants.events.course.resultChanged, function (courseData) {
            if (viewModel.id != courseData.id)
                return;

            viewModel.score(courseData.score);
            viewModel.isComplete(courseData.isComplete);
        });

        return viewModel;
    };

    return ctor;
});