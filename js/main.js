(function () {
    var dataUrl = 'data/data.json',
        manifestUrl = '/manifest.json',
        defaultCourseThumbnailUrl = 'img/default.png';

    var viewModel = {
        isError: ko.observable(false),
        title: '',
        courses: []
    };

    viewModel.init = function () {
        return $.getJSON(dataUrl).then(function (data) {
            return getThumbnailUrls(data.courses).then(function () {
                viewModel.title = data.title;
                viewModel.courses = data.courses;
            });
        }).fail(function () {
            viewModel.isError(true);
        });
    };

    function getThumbnailUrls(courses) {
        var arrayPromises = [];
        $.each(courses, function (index, course) {
            if (course.link) {
                arrayPromises.push(getThumbnailUrl(course.link).then(function (thumbnailUrl) {
                    course.thumbnailUrl = thumbnailUrl;
                }));
            }
        });

        return $.when.apply($, arrayPromises);
    }

    function getThumbnailUrl(link) {
        return $.getJSON(link + manifestUrl).then(function (manifest) {
            return manifest.thumbnail ? link + '/' + manifest.thumbnail : defaultCourseThumbnailUrl;
        }).fail(function () {
            return defaultCourseThumbnailUrl;
        });
    }

    viewModel.init().always(function () {
        $(document).ready(function () {
            ko.applyBindings(viewModel, $('html')[0]);
        });
    });

})();