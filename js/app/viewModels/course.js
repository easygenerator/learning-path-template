define(['constants', 'eventManager'], function (constants, eventManager) {
    "use strict";

    var ctor = function (course) {
        var viewModel = {
            id: course.id,
            title: course.title,
            link: course.link,
            thumbnailUrl: course.thumbnailUrl,
            isComplete: ko.observable(course.isComplete),
            score: ko.observable(course.score)
        };

        eventManager.on(constants.events.course.resultChanged, function (event) {
            var updatedCourse = event.value;
            if (!updatedCourse || updatedCourse.id != viewModel.id)
                return;

            viewModel.score(updatedCourse.score);
            viewModel.isComplete(updatedCourse.isComplete);
        });

        return viewModel;
    };

    return ctor;
});