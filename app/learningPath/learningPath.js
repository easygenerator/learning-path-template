define(['knockout', 'data/models/course', 'data/models/document', 'course/course', 'document/index', 'data/dataContext'], function (ko, Course, Document, CourseViewModel, DocumentViewModel, dataContext) {
    "use strict";

    var viewModel = {
        entities: [],
        title: '',
        activate: activate,
        isCourse(entity) {
            return entity instanceof CourseViewModel;
        }
    };

    return viewModel;

    function activate() {
        viewModel.title = dataContext.learningPath.title;

        viewModel.entities = _.map(dataContext.learningPath.entities, function(entity) {
            if(entity instanceof Course){
                return new CourseViewModel(entity);
            }
            return new DocumentViewModel(entity);
        });
    }
});