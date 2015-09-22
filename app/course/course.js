define(['constants', 'durandal/app', 'xApi/xApi', 'utils'], function (constants, app, xApi, utils) {
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

        viewModel.activate = function() {
            viewModel.link = addAutoLoginParams(viewModel.link);
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

        function addAutoLoginParams(courseLink) {
            var currentUser = xApi.currentUser();
            if (currentUser) {
                courseLink = utils.updateQueryStringParameter(courseLink, 'name', currentUser.username);
                courseLink = utils.updateQueryStringParameter(courseLink, 'email', currentUser.email);
            }
            return courseLink;
        }

        return viewModel;
    };

    return ctor;
});