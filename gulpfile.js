var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var reload = browserSync.reload;

var JS_BLOB = 'js/*.js';
var CSS_BLOB = 'css/*.css';

gulp.task('scripts', function() {
  return gulp.src(JS_BLOB)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('lint', function() {
  return gulp.src(JS_BLOB)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
})

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(['*.html', JS_BLOB, CSS_BLOB], {cwd: '.'}, reload);
})
