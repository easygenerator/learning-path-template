/// <vs SolutionOpened='watch' />

var gulp = require('gulp'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    eventStream = require('event-stream'),
    amdOptimize = require('amd-optimize'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    output = ".output",
    buildVersion = +new Date(),
    durandal = require('gulp-durandal'),
    $ = require('gulp-load-plugins')({
        lazy: true
    });

var config = {
    less: {
        src: ['./css/**/*.less'],
        dest: './css',

        browsers: ['last 1 Chrome version', 'last 1 Firefox version', 'last 1 Explorer version', 'last 1 Safari version', 'Android > 2.3']
    }
};

function addBuildVersion() {
    return eventStream.map(function (file, callback) {
        var filePath = file.history[0];
        if (filePath && filePath.match(/\.(js)$/gi)) {
            callback(null, file);
            return;
        }
        var fileContent = String(file.contents);
        fileContent = fileContent
            .replace(/(\?|\&)v=([0-9]+)/gi, '') // remove build version
            .replace(/\.(jpeg|jpg|png|gif|css|js|html|eot|svg|ttf|woff)([?])/gi, '.$1?v=' + buildVersion + '&') // add build version to resource with existing query param
            .replace(/\.(jpeg|jpg|png|gif|css|js|html|eot|svg|ttf|woff)([\s\"\'\)])/gi, '.$1?v=' + buildVersion + '$2') // add build version to resource without query param
            .replace(/urlArgs: 'v=buildVersion'/gi, 'urlArgs: \'v=' + buildVersion + '\''); // replace build version for require config
        file.contents = new Buffer(fileContent);
        callback(null, file);
    });
};

gulp.task('styles', function () {
    return gulp.src(config.less.src)
        .pipe($.plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe($.less({
            strictMath: true,
            strictUnits: true
        }))
        .pipe($.autoprefixer({
            browsers: config.less.browsers,
            cascade: false
        }))
        .pipe(gulp.dest(config.less.dest));
});

gulp.task('watch', function () {
    gulp.watch('./css/*.less', ['styles']);
});

gulp.task('clean', function (cb) {
    del([output], cb);
});

gulp.task('build', ['clean', 'styles'], function () {
    var assets = useref.assets();

    gulp.src('index.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(addBuildVersion())
        .pipe(gulp.dest(output));

    durandal(
      {
          minify: true
      })
     .pipe(addBuildVersion())
     .pipe(gulp.dest(output + '/app'));

    gulp.src(['favicon.ico', 'readme.txt'])
        .pipe(gulp.dest(output));

    gulp.src('css/img/**')
       .pipe(gulp.dest(output + '/css/img'));

    return gulp.src('css/font/**')
       .pipe(gulp.dest(output + '/css/font'));
});

gulp.task('webserver', function () {
    gulp.src('.')
        .pipe($.webserver({
            livereload: {
                enable: true,
                filter: function (fileName) {
                    return !fileName.match(/.css/);
                }
            },
            directoryListing: true,
            open: "index.html"
        }));
});
