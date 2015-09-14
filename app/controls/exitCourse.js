define(['durandal/app', 'windowOperations', 'progress/progressContext', 'constants'],
    function (app, windowOperations, progressContext,  constants) {
        "use strict";

        var progressStatuses = constants.progressContext.statuses;

        var statuses = {
            readyToFinish: 'readyToFinish',
            sendingRequests: 'sendingRequests',
            finished: 'finished'
        };

        var viewModel = {
            status: ko.observable(statuses.readyToFinish),
            statuses: statuses,
            finishPopupVisibility: ko.observable(false),

            close: close,
            finish: finish,
            openFinishPopup: openFinishPopup,
            closeFinishPopup: closeFinishPopup
        };

        viewModel.isProgressSaved = ko.computed(function () {
            return progressContext.status() === progressStatuses.saved;
        });

        viewModel.isProgressNotSaved = ko.computed(function () {
            return progressContext.status() === progressStatuses.error;
        });

        return viewModel;

        function onCourseFinishedCallback() {
            viewModel.status(statuses.finished);

            progressContext.status(progressStatuses.ignored);
            windowOperations.close();
        }

        function close() {
            if (progressContext.status() === progressStatuses.error) {
                var isCourseClosingConfirmed = confirm("Progress can't be saved. Close course anyway?");
                if (!isCourseClosingConfirmed) {
                    return;
                }
                progressContext.status(progressStatuses.ignored);
            }

            windowOperations.close();
        }

        function finish() {
            if (viewModel.status() !== statuses.readyToFinish) {
                return;
            }
            viewModel.status(statuses.sendingRequests);
            //var course = courseRepository.get();
            //course.finish(onCourseFinishedCallback);

            progressContext.remove();
        }

        function openFinishPopup() {
            viewModel.finishPopupVisibility(true);
        }

        function closeFinishPopup() {
            viewModel.finishPopupVisibility(false);
        }

    });