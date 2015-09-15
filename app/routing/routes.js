define([], function () {
    return [
        {
            route: '',
            moduleId: 'learningPath/learningPath',
            title: 'Learning path'
        },
        {
            route: 'login',
            moduleId: 'xApi/login/login',
            title: 'xApi Login',
            hideExitButton: true,
            onlyHorizontalHeader: true
        },
        {
            route: 'xapierror',
            moduleId: 'xApi/error/error',
            title: 'xApi Error',
            hideExitButton: true
        }
    ];
});