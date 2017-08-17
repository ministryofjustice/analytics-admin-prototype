/*
  lint.js
  ===========
  watches js files and lints with es-lint
  because StandardJS can eat my entire ass
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
  return gulp.src(['./app/assets/javascripts/**/*.js', '!./app/assets/javascripts/vendor/**', './app/modules/**', './app/scripts/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
