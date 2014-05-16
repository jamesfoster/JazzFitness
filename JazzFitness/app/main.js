requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'parse': '../lib/parse/parse-1.2.18'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'parse': {
          deps: ['jquery'],
          exports: 'Parse'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'parse'],  function (system, app, viewLocator, Parse) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Jazz Fitness';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        Parse.initialize("C2wgrNDQ99uvxiZY9z5z00jCIOPELm03LTUK6yLm", "PT3QDzMfbvtrKz9OkQiLFKyjA2uYFN9trIBXXqS9");
        viewLocator.useConvention();
        app.setRoot('shell', 'entrance');
    });
});