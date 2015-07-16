define(['data/dataContext', 'viewModels/learningPath'], function (dataContext, LearningPath) {
    "use strict";

    var viewModel = {
        isError: ko.observable(false),
        learningPath: null
    };

    viewModel.init = function () {
        return dataContext.init()
            .then(function () {
                viewModel.learningPath = new LearningPath(dataContext.learningPath);

            })
            .fail(function () {
                viewModel.isError(true);
            });
    };

    viewModel.init().always(function () {
        $(document).ready(function () {
            ko.applyBindings(viewModel, $('html')[0]);
        });
    });

});