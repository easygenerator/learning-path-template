define(['data/dataContext', 'viewModels/learningPath', 'data/courseResultTracker'], function (dataContext, LearningPath, courseResultTracker) {
    "use strict";

    var viewModel = {
        isLoading: ko.observable(true),
        isError: ko.observable(false),
        learningPath: null
    };

    viewModel.init = function () {
        return dataContext.init()
            .then(function () {
                viewModel.learningPath = new LearningPath(dataContext.learningPath);
                courseResultTracker.startTracking();
            })
            .fail(function () {
                viewModel.isError(true);
            })
            .always(function () {
                viewModel.isLoading(false);
            });
    };

    $(document).ready(function () {
        ko.applyBindings(viewModel, $('html')[0]);
    });

    viewModel.init();
});