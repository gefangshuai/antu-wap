/**
 * Created by gefangshuai on 2016/2/25.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-clean-css');
var del = require('del');
var rename = require('gulp-rename');
/*
gulp.task('clean', function (cb) {
    del(['target/static/js/date.min.js', 'target/static/css/style.min.css'], cb)
});
*/

gulp.task('minify', function () {
    gulp.src('source/js/date.js')
        .pipe(uglify())
        .pipe(rename('date.min.js'))
        .pipe(gulp.dest('static/js'))
});

gulp.task('cleancss', function () {
    gulp.src('source/css/style.css')
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('static/css'));
});

gulp.task('default', ['minify', 'cleancss']);

gulp.task('watcher', function () {
    gulp.watch("source/css/style.css", ['cleancss']);
    gulp.watch("source/js/date.js", ['minify']);
});