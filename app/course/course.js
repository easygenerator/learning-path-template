define(['constants', 'durandal/app', 'xApi/xApi', 'utils'], function (constants, app, xApi, utils) {
    "use strict";

   function CourseViewModel (course) {
       var that = this;
       
       this.id = course.id;
       this.title = course.title;
       this.link = course.link;
       this.thumbnailUrl = course.thumbnailUrl;
       this.status = ko.observable(course.status);
       this.score = ko.observable(course.score);
       this.constants = constants;
       this.progressTrackable = course.progressTrackable;

       this.activate = function () {
           that.link = xApi.enabled() ? addAutoLoginParams(that.link) : addSkipXapiParam(that.link);
           that.link = utils.updateQueryStringParameter(that.link, 'cross-device', false);  //disable cross device storage
        };

        this.statusTitle = ko.computed(function () {
            switch (that.status()) {
                case constants.course.statuses.inProgress:
                    return 'In progress';
                case constants.course.statuses.completed:
                    return 'Completed';
                case constants.course.statuses.failed:
                    return 'Failed';
                default:
                    return '';
            }
        });

        app.on(constants.events.course.resultChanged, function (courseData) {
            if (that.id != courseData.id)
                return;

            that.score(courseData.score);
            that.status(courseData.status);
        });

        function addSkipXapiParam(courseLink) {
            courseLink = utils.updateQueryStringParameter(courseLink, 'xapi', false);
            return courseLink;
        }

        function addAutoLoginParams(courseLink) {
            var currentUser = xApi.currentUser();
            if(currentUser)
            {
                courseLink = utils.updateQueryStringParameter(courseLink, 'name', currentUser.username);
                courseLink = utils.updateQueryStringParameter(courseLink, 'email', currentUser.email);
            }
            return courseLink;
        }
    };
    
    return CourseViewModel;
});