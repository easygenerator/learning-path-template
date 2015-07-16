define(['data/models/learningPath', 'data/courseMapper'], function (LearningPath, courseMapper) {
    "use strict";

    var dataUrl = 'data/data.json';

    var self = {
        init: init,
        learningPath: null
    };

    return self;

    function init() {
        return $.getJSON(dataUrl).then(function(data) {
            var mapPromises = [];
            data.courses.forEach(function(item) {
                mapPromises.push(courseMapper.map(item));
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