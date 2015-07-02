(function () {

    var viewModel = {
        isError: ko.observable(false),
        title: '',
        courses: []
    };

    viewModel.init = function () {
        var dataUrl = '../data/data.json';

        return $.getJSON(dataUrl).then(function (data) {
            viewModel.title = data.title;
            viewModel.courses = data.courses;
        }).fail(function () {
            viewModel.isError(true);
        });
    };

    viewModel.init().always(function () {
        $(document).ready(function () {
            ko.applyBindings(viewModel, $('.learning-path-container')[0]);
        });
    });

})();