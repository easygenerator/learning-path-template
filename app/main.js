requirejs.config({
    paths: {
        'text': '../js/vendor/requirejs-text/text',
        'durandal': '../js/vendor/durandal/js',
        'plugins': '../js/vendor/durandal/js/plugins',
        'transitions': '../js/vendor/durandal/js/transitions'
    }
});

define('jquery', function () { return jQuery; });
define('knockout', function () { return ko; });

define(['durandal/app', 'durandal/viewLocator', 'durandal/system'],
    function (app, viewLocator, system) {
        app.title = 'easygenerator';
        system.debug(false);

        app.configurePlugins({
            http: true
        });

        app.start().then(function () {
            viewLocator.useConvention();
            app.setRoot('viewmodels/shell');
        });
    }
);