define(['data/dataContext'], function (dataContext) {
    'use strict';

    var viewModel = {
        isError: ko.observable(false),
        activate: activate
    };

    return viewModel;

    function activate() {
        return dataContext.init()
            .fail(function () {
                viewModel.isError(true);
            });
    }
});