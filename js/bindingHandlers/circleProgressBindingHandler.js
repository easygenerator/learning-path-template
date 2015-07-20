ko.bindingHandlers.circleProgress = {
    init: function (element) {
        var $element = $(element);
        var $canvas = $('<canvas width="106px" height="106px">');
        $canvas.appendTo($element);
    },
    update: function (element, valueAccessor) {
        var score = ko.unwrap(valueAccessor().score) || 0,
            isCompleted = ko.unwrap(valueAccessor().isCompleted),
            $canvas = $(element).children('canvas'),
            ctx = $canvas[0].getContext('2d'),
            percentage = (score / 100) * 2 - 0.5;

        ctx.clearRect(0, 0, $canvas.width(), $canvas.height());

        var progressBarColor = isCompleted ? '#49b8e7' : '#f16162';
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