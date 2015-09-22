define([], function () {

    var viewModel = {
        activate: activate,
        finish: function () {

        },
        close: function () {

        }
    };

    return viewModel;

    function activate(data) {
        if (!_.isFunction(data.finish) || !_.isFunction(data.close)) {
            return;
        }
        viewModel.finish = function () {
            data.finish();
            data.close();
        };
        viewModel.close = data.close;
    }
});