define([], function () {
    return {
        learningPath: {
            dataUrl: 'data/data.json',
            progressStorageKey: 'learning_path_progress'
        },
        learningPathEntityType: {
            course: 0,
            document: 1
        },
        course: {
            manifestUrl: '/manifest.json',
            defaultCourseThumbnailUrl: 'img/default.png',
            contentDataUrl: '/content/data.js',
            resultStorageKey: 'course_result',
            statuses: {
                completed: 'completed',
                failed: 'failed',
                inProgress: 'inProgress',
                notAttempted: 'notAttempted'
            }
        },
        document: {
            contentDataUrl: '/data.js',
            contentUrl: '/content.html',
            type: {
                powerPoint: 1,
                pdf: 2,
                office: 3
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
            },
            app: {
                closed: "app:closed"
            }
        },
        xApi: {
            extenstionKeys: {
                learningPathId: "http://easygenerator/expapi/learningpath/id"
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