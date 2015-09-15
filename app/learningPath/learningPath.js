define(['knockout', 'course/course', 'data/dataContext'], function (ko, Course, dataContext) {
    "use strict";

    var viewModel = {
        courses: [],
        title: '',
        activate: activate
    };

    return viewModel;

    function activate() {
        viewModel.title = dataContext.learningPath.title;

        viewModel.courses = _.map(dataContext.learningPath.courses, function(course) {
            return new Course(course);
        });
    }
});