define(['data/models/course'], function (Course) {
    "use strict";

    var manifestUrl = '/manifest.json',
    defaultCourseThumbnailUrl = 'img/default.png';

    return {
        map: map
    };

    function map(course) {
        var defer = $.Deferred();

        var viewModel = new Course(course.title, course.link);
        if (course.link) {
            getThumbnailUrl(course.link).then(function (thumbnailUrl) {
                viewModel.thumbnailUrl = thumbnailUrl;
                defer.resolve(viewModel);
            });
        } else {
            defer.resolve(viewModel);
        }

        return defer.promise();
    }

    function getThumbnailUrl(link) {
        return $.getJSON(link + manifestUrl).then(function (manifest) {
            return manifest.thumbnail ? link + '/' + manifest.thumbnail : defaultCourseThumbnailUrl;
        }).fail(function () {
            return defaultCourseThumbnailUrl;
        });
    }
});