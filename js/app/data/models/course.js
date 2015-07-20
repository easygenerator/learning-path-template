define([], function () {
    "use strict";

    var ctor = function (title, link) {
        var that = {
            title: title,
            link: link,
            thumbnailUrl: '',
            isComplete: false,
            score: 0,
            setResult: setResult
        };

        return that;

        function setResult(result) {
            if (!result)
                return;

            that.score = result.score;
            that.isComplete = result.isComplete;
        }
    };

    return ctor;
});