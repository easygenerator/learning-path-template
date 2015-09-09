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

define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'templateSettings'],
    function (app, viewLocator, system, templateSettings) {
        
        app.title = 'easygenerator';
        system.debug(false);

        app.configurePlugins({
            http: true,
            router: true
        });

        app.start().then(function () {
            return templateSettings.init().then(function () {
                app.setRoot('shell/shell');
            });
        });
    }
);