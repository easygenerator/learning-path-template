define(['constants', 'data/models/learningPath', 'data/mappers/courseMapper', 'data/mappers/documentMapper'], function (constants, LearningPath, courseMapper, documentMapper) {
    "use strict";

    var self = {
        init: init,
        learningPath: null
    };

    return self;

    function init() {
        return $.getJSON(constants.learningPath.dataUrl).then(function (data) {
            var promises = [];
            data.entities.forEach(function (item) {
                if(item.type === constants.learningPathEntityType.course) {
                    promises.push(courseMapper.map(item.title, item.link));
                } else if(item.type === constants.learningPathEntityType.document) {
                    promises.push(documentMapper.map(item.title, item.link));
                }
            });
          
            return $.when.apply($, promises).then(function () {
                var entities = [];
                for (var i = 0; i < arguments.length; i++) {
                    entities.push(arguments[i]);
                }

                self.learningPath = new LearningPath(data.id, data.title, new Date(data.createdOn), entities);
            });
        });
    }
});