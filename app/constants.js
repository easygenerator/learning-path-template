define([], function () {
    return {
        learningPath: {
            dataUrl: 'data/data.json'
        },
        course: {
            manifestUrl: '/manifest.json',
            defaultCourseThumbnailUrl: 'img/default.png',
            contentDataUrl: '/content/data.js',
            resultStorageKey: 'course_result',
            progressStorageKey: '',
            statuses: {
                completed: 'completed',
                failed: 'failed',
                inProgress: 'inProgress',
                notAttempted: 'notAttempted'
            }
        },
        events: {
            course: {
                resultChanged: 'course:resultChanged',
                resultStorageEntryUpdated: 'course:resultStorageEntryUpdated'
            },
            user: {
                authenticated: 'user:authenticated',
                authenticationSkipped: "user:authentication-skipped"
            }
        },
        progressContext: {
            statuses: {
                undefined: 'undefined',
                saved: 'saved',
                error: 'error',
                ignored: 'ignored'
            }
        }
    };
});