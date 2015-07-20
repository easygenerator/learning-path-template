requirejs.config({
    paths: {
        'text': '../vendor/requirejs-text/text',
        'durandal': '../vendor/durandal/js',
        'plugins': '../vendor/durandal/js/plugins',
        'transitions': '../vendor/durandal/js/transitions'
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