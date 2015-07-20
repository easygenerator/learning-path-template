define(['constants', 'data/models/course', 'data/courseResultProvider'], function (constants, Course, courseResultProvider) {
    "use strict";

    return {
        map: map
    };

    function map(title, link) {
        var course = new Course(title, link);

        return $.getJSON(course.link + constants.course.contentDataUrl).then(function (courseData) {
            course.id = courseData.id;
            course.createdOn = new Date(courseData.createdOn);

            setCourseResult();

            if (course.link) {
                return getThumbnailUrl().then(function (thumbnailUrl) {
                    course.thumbnailUrl = thumbnailUrl;
                    return course;
                });
            } else {
                return course;
            }
        });

        function setCourseResult() {
            var result = courseResultProvider.getResult(course.id, course.createdOn);
            if (!result)
                return;

            course.score = result.score;
            course.isCompleted = result.isCompleted;
        }

        function getThumbnailUrl() {
            return $.getJSON(link + constants.course.manifestUrl).then(function (manifest) {
                return manifest.thumbnail ? link + '/' + manifest.thumbnail : constants.course.defaultCourseThumbnailUrl;
            }).fail(function () {
                return constants.course.defaultCourseThumbnailUrl;
            });
        }
    }
});