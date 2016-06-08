var gulp = require('gulp'),
    jsx = require('gulp-jsx'),
    browserify = require('gulp-browserify'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename');

gulp.task('publish', function () {
    return gulp.src('./js/index.jsx')
        .pipe(jsx({
            factory: 'ReactDOM.render'
        }))
        .pipe(browserify())
        .pipe(rename('index.js'))
        .pipe(gulp.dest('./dist/'));
});