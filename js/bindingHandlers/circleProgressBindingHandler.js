ko.bindingHandlers.circleProgress = {
    init: function (element) {
        var $element = $(element);
        var $canvas = $('<canvas width="106px" height="106px">');
        $canvas.appendTo($element);
    },
    update: function (element, valueAccessor) {
        var score = ko.unwrap(valueAccessor().score) || 0,
            isComplete = ko.unwrap(valueAccessor().isComplete),
            $canvas = $(element).children('canvas')[0],
            ctx = $canvas.getContext('2d'),
            percentage = (score / 100) * 2 - 0.5;

        var progressBarColor = isComplete ? '#49b8e7' : '#f16162';
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#e8e8e8';

        ctx.beginPath();
        ctx.arc(53, 53, 50, -0.5 * Math.PI, 1.5 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = progressBarColor;
        ctx.beginPath();
        ctx.arc(53, 53, 50, -0.5 * Math.PI, percentage * Math.PI);
        ctx.stroke();
    }
};