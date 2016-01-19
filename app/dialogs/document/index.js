define([], function () {

    var viewModel = {
        isShown: ko.observable(false),
        type: null,
        title: '',
        embedCode: '',

        show: function (title, embedCode, type) {
            viewModel.title = title;
            viewModel.embedCode = embedCode;
            viewModel.type = type;
            viewModel.isShown(true);
        },
        close: function () {
            viewModel.isShown(false);
            viewModel.title = '';
            viewModel.embedCode = '';
            viewModel.type = null;
        }
    };

    return viewModel;
});