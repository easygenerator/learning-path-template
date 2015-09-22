define(['durandal/system', 'durandal/app', 'plugins/router', 'eventManager', 'data/dataContext', 'userContext', 'constants'],
    function (system, app, router, eventManager, dataContext, userContext, constants) {
        
        var
            statuses = constants.progressContext.statuses,
            self = {
                storage: null,
                progress: {
                    _v: 1,
                    user: null,
                    attemptId: system.guid()
                }
            },
            context = {
                init: init,
                get: get,
                remove: remove,
                status: ko.observable(statuses.undefined)
            }
        ;

        return context;

        function save() {
            context.status(self.storage.saveProgress(self.progress) ? statuses.saved : statuses.error);
        }

        function onAuthenticated(user) {
            self.progress.user = user;
            save();
        }

        function onAuthenticationSkipped() {
            self.progress.user = 0;
            save();
        }

        function get() {
            return self.progress;
        }

        function remove() {
            self.storage.removeProgress();
        }

        function init(progressStorage) {
            self.storage = progressStorage;
            self.progress._v = dataContext.learningPath.createdOn.getTime();

            restore(userContext.getCurrentUser());

            app.on(constants.events.user.authenticated).then(onAuthenticated);
            app.on(constants.events.user.authenticationSkipped).then(onAuthenticationSkipped);

            window.onbeforeunload = function() {
                if (context.status() === statuses.error) {
                    return 'Course progress cannot be saved. Please try again or contact your teacher if the problem persists.';
                }
            };
        }

        function restore(user) {
            var progress = self.storage.getProgress();

            if (!_.isEmpty(progress) && _.isString(progress.attemptId) && progress._v === self.progress._v &&
                ((!user) || (user.username === progress.user.username && user.email === progress.user.email))) {
                self.progress = progress;
            }
        }
    });
