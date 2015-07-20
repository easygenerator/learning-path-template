define(['constants', 'data/models/learningPath', 'data/courseMapper'], function (constants, LearningPath, courseMapper) {
    "use strict";

    var self = {
        init: init,
        learningPath: null
    };

    return self;

    function init() {
        return $.getJSON(constants.learningPath.dataUrl).then(function (data) {
            var mapPromises = [];
            data.courses.forEach(function (item) {
                mapPromises.push(courseMapper.map(item.title, item.link));
            });

            return $.when.apply($, mapPromises).then(function () {
                var courses = [];
                for (var i = 0; i < arguments.length; i++) {
                    courses.push(arguments[i]);
                }

                self.learningPath = new LearningPath(data.title, courses);
            });
        });
    }
});