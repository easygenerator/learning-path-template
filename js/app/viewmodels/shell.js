define(['data/dataContext', 'data/courseResultTracker'], function (dataContext, courseResultTracker) {
    'use strict';

    var viewModel = {
        isError: ko.observable(false),
        activate: activate
    };

    return viewModel;

    function activate() {
        return dataContext.init()
            .then(function () {
                courseResultTracker.startTracking();
            })
            .fail(function () {
                viewModel.isError(true);
            });
    }
});