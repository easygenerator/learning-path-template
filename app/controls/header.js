define(['data/dataContext', 'plugins/router', 'viewSettings'],
    function (dataContext, router, viewSettings) {
        'use strict';

        var viewModel = {
            activate: activate,
            title: ko.observable(),
            viewSettings: viewSettings
        };

        function activate() {
            viewModel.title(dataContext.learningPath.title);
        }

        return viewModel;
    });