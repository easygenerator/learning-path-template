define(['constants', 'data/models/learningPath', 'data/courseMapper'], function (constants, LearningPath, courseMapper) {
    "use strict";

    var self = {
        init: init,
        learningPath: null
    };

    return self;

    function init() {
        return $.getJSON(constants.learningPath.dataUrl).then(function (data) {
            var promises = [];
            data.courses.forEach(function (item) {
                promises.push(courseMapper.map(item.title, item.link));
            });
          
            return $.when.apply($, promises).then(function () {
                var courses = [];
                for (var i = 0; i < arguments.length; i++) {
                    courses.push(arguments[i]);
                }

                self.learningPath = new LearningPath(data.id, data.title, new Date(data.createdOn), courses);
            });
        });
    }
});