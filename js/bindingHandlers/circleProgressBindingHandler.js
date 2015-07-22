ko.bindingHandlers.circleProgress = {
    init: function (element) {
        if (!window.requestAnimationFrame) {
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
        }

        var $element = $(element);
        var $canvas = $('<canvas width="106px" height="106px">');
        $canvas.appendTo($element);
    },
    update: function (element, valueAccessor) {
        var score = ko.unwrap(valueAccessor().score) || 0,
            status = ko.unwrap(valueAccessor().status),
            $canvas = $(element).children('canvas'),
            ctx = $canvas[0].getContext('2d'),
            step = 1.5,
            currentScore = 0 - step,
            progressBarColor = getProgressBarColor();

        if (window.requestAnimationFrame) {
            animate();
        } else {
            draw(score);
        }

        function animate() {
            currentScore += step;
            draw(currentScore);

            if (currentScore < score) {
                window.requestAnimationFrame(function () {
                    animate();
                });
            }
        }

        function draw(percentage) {
            var value = (percentage / 100) * 2 - 0.5;

            ctx.clearRect(0, 0, $canvas.width(), $canvas.height());

            ctx.lineWidth = 4;
            ctx.strokeStyle = '#e8e8e8';

            ctx.beginPath();
            ctx.arc(53, 53, 50, -0.5 * Math.PI, 1.5 * Math.PI);
            ctx.stroke();

            ctx.strokeStyle = progressBarColor;
            ctx.beginPath();
            ctx.arc(53, 53, 50, -0.5 * Math.PI, value * Math.PI);
            ctx.stroke();
        }

        function getProgressBarColor() {
            switch (status) {
                case 'inProgress':
                    return '#49b8e7';
                case 'completed':
                    return '#49b8e7';
                case 'failed':
                    return '#f16162';
                default:
                    return '#49b8e7';
            }
        }
    }
};