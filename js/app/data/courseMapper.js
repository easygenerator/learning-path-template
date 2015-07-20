define(['constants', 'data/models/course', 'data/courseResultProvider'], function (constants, Course, courseResultProvider) {
    "use strict";

    return {
        map: map
    };

    function map(title, link) {
        var defer = $.Deferred();

        var course = new Course(title, link);

        $.getJSON(course.link + constants.course.contentDataUrl).then(function (courseData) {
            course.id = courseData ? courseData.id : undefined;
            course.createdOn = courseData ? courseData.createdOn : undefined;

            setCourseResult(course);

            if (course.link) {
                getThumbnailUrl(course.link).then(function (thumbnailUrl) {
                    course.thumbnailUrl = thumbnailUrl;
                    defer.resolve(course);
                });
            } else {
                defer.resolve(course);
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

    function setCourseResult(course) {
        var result = courseResultProvider.getResult(course.id, course.createdOn);
        if (!result)
            return;

        course.setResult(result);
    }
});