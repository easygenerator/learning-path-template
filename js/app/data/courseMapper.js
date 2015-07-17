define(['constants', 'data/models/course', 'data/courseProgressProvider'], function (constants, Course, courseProgressProvider) {
    "use strict";

    return {
        map: map
    };

    function map(course) {
        var defer = $.Deferred();

        var viewModel = new Course(course.title, course.link);

        $.getJSON(course.link + constants.course.contentDataUrl).then(function (courseData) {
            viewModel.id = courseData ? courseData.id : undefined;
            viewModel.createdOn = courseData ? courseData.createdOn : undefined;

            setCourseProgress(course);

            if (course.link) {
                getThumbnailUrl(course.link).then(function (thumbnailUrl) {
                    viewModel.thumbnailUrl = thumbnailUrl;
                    defer.resolve(viewModel);
                });
            } else {
                defer.resolve(viewModel);
            }
        });

        return defer.promise();
    }

    function getThumbnailUrl(link) {
        return $.getJSON(link + constants.course.manifestUrl).then(function (manifest) {
            return manifest.thumbnail ? link + '/' + manifest.thumbnail : constants.course.defaultCourseThumbnailUrl;
        }).fail(function () {
            return constants.course.defaultCourseThumbnailUrl;
        });
    }

    function setCourseProgress(course) {
        var progress = courseProgressProvider.getProgress(course.id, course.createdOn);
        if (!progress)
            return;


    }
});