var gulp = require('gulp'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    eventStream = require('event-stream'),
    gulpif = require('gulp-if'),
    output = ".output",
    buildVersion = +new Date();

    function addBuildVersion() {
        return eventStream.map(function (file, callback) {
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

gulp.task('clean', function (cb) {
    del([output], cb);
});

gulp.task('build', ['clean'], function () {
    var assets = useref.assets();

    gulp.src('index.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(addBuildVersion())
        .pipe(gulp.dest(output));

    return gulp.src('css/font/**')
       .pipe(gulp.dest(output + '/css/font'));
});

