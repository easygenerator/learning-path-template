define(['durandal/app', 'windowOperations', 'progress/progressContext', 'constants', 'eventManager', 'data/dataContext'],
    function (app, windowOperations, progressContext, constants, eventManager, dataContext) {
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
            isProgressSaved: ko.observable(false),

            close: close,
            finish: finish,
            openFinishPopup: openFinishPopup,
            closeFinishPopup: closeFinishPopup,
            activate: activate
        };

        viewModel.isProgressNotSaved = ko.computed(function () {
            return progressContext.status() === progressStatuses.error;
        });

        return viewModel;

        function activate() {
            app.on(constants.events.course.resultChanged, function () {
                viewModel.isProgressSaved(true);
            });
        }
        function onLearningPathFinishedCallback() {
            eventManager.turnAllEventsOff();
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

            eventManager.learningPathFinished(dataContext.learningPath, onLearningPathFinishedCallback);

            progressContext.remove();
        }

        function openFinishPopup() {
            viewModel.finishPopupVisibility(true);
        }

        function closeFinishPopup() {
            viewModel.finishPopupVisibility(false);
        }

    });