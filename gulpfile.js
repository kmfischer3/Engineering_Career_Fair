var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var svgmin = require('gulp-svgmin');
var merge = require('merge-stream');
var reload = browserSync.reload;

var JS_BLOB = 'js/*.js';
var CSS_BLOB = 'css/*.css';

function build() {
     var minify_map = gulp.src('static/map.svg')
            .pipe(svgmin({
                plugins: [{
                    mergePaths: false,
                    cleanupIDs: false
                }]
            }))
            .pipe(gulp.dest('build/static/'));

    var combine_scripts = gulp.src(JS_BLOB)
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest('./build/'));

    return merge(minify_map, combine_scripts);
}

gulp.task('build', build);

gulp.task('lint', function() {
    return gulp.src(JS_BLOB)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });
    
    gulp.watch(['*.html', JS_BLOB, CSS_BLOB], {cwd: '.'}, function() {
        build();
        reload();
    });
});
