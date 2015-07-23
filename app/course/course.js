define(['constants', 'durandal/app'], function (constants, app) {
    "use strict";

    var ctor = function (course) {
        var viewModel = {
            id: course.id,
            title: course.title,
            link: course.link,
            thumbnailUrl: course.thumbnailUrl,
            status: ko.observable(course.status),
            score: ko.observable(course.score),
            constants: constants,
            progressTrackable: course.progressTrackable
        };

        viewModel.statusTitle = ko.computed(function () {
            switch (viewModel.status()) {
                case constants.course.statuses.inProgress:
                    return 'In progress';
                case constants.course.statuses.completed:
                    return 'Completed';
                case constants.course.statuses.failed:
                    return 'Failed';
                default:
                    return '';
            }
        });

        app.on(constants.events.course.resultChanged, function (courseData) {
            if (viewModel.id != courseData.id)
                return;

            viewModel.score(courseData.score);
            viewModel.status(courseData.status);
        });

        return viewModel;
    };

    return ctor;
});