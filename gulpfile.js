// paths used in the gulp tasks
var PATHS = {
    proxies:        './mock/proxies.js',
    responses:      './mock/responses.json',
    app:            './app/',
    node_modules:   './node_modules/'
};

// required modules for server task
var gulp        = require('gulp'),
    server      = require('gulp-server-livereload'),
    argv        = require('yargs').argv,
    Stubby      = require('stubby').Stubby;

// server task
gulp.task('webserver', function() {

    // get '--mock' flag from command line
    var useMock = argv.mock;

    // if 'mock flag' is present, use proxy list, otherwise do not proxy anything
    var proxies = useMock ? require(PATHS.proxies) : [];

    // if 'mock flag' is present, start Stubby server instance
    if(useMock){
        var mockService = new Stubby();
        mockService.start({
            // pass in path to pre-defined responses
            data: require(PATHS.responses),
            // optional stubby flag for more informative logging
            mute: false
        });        
    }

    // return gulp server task
    return gulp.src([PATHS.app, PATHS.node_modules])
        .pipe(server({
            // mandatory setting - pass in pre-defined proxies 
            proxies: proxies,
            // optional - livereload flag
            livereload: true
        }));
});

gulp.task('default', ['webserver']);