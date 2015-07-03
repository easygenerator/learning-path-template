var gulp = require('gulp'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    output = ".output";

gulp.task('build', ['clean', 'build-app'], function () {
});

gulp.task('clean', function (cb) {
    del([output], cb);
});

gulp.task('build-app', ['clean'], function () {
    var assets = useref.assets();

    gulp.src('index.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(output));

    return gulp.src('css/font/**')
       .pipe(gulp.dest(output + '/css/font'));
});

