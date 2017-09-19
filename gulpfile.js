'use strict';

var gulp           = require('gulp');
var postcss        = require('gulp-postcss');
var sourcemaps     = require('gulp-sourcemaps');
var imagemin       = require('gulp-imagemin');
var browserSync    = require('browser-sync').create();
var watch          = require('gulp-watch');
var mainBowerFiles = require('gulp-main-bower-files');  // get main bower files
var gulpFilter     = require('gulp-filter');            // file filtration
var flatten        = require('gulp-flatten');           // remove folders structure
var pshort         = require('postcss-short');
var cssnext        = require('postcss-cssnext');
var precss         = require('precss');



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./frontend/stylesheets/**/*.css', ['css']);           // postcss watching
    gulp.watch("./*.html").on('change', browserSync.reload);            // html watching and reload browser
    gulp.watch("./frontend/stylesheets/**/*.js").on('change', browserSync.reload);    // js watching and reload browser
});

gulp.task('css', function () {
    var plugins = [
            precss({}),
            pshort, 
            cssnext
    ];
    return gulp.src('./frontend/stylesheets/main.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(browserSync.stream())                     // reload browser
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('fonts', function() {
  return gulp.src('./frontend/fonts/**/*')
  .pipe(gulp.dest('./public/fonts'))
});

gulp.task('image:watch', ['image:build'], function(){   // Task for watching new and deleted images, task image:build runs before this task is running
    return watch([                                      // path to files to watch
        './frontend/images/**/*.jpg',
        './frontend/images/**/*.png',
        './frontend/images/**/*.svg',
        './frontend/images/**/*.gif'], function () {
        gulp.src([                                      // path to files to build
            './frontend/images/**/*.jpg',
            './frontend/images/**/*.png',
            './frontend/images/**/*.svg',
            './frontend/images/**/*.gif'
        ])
            .pipe(imagemin())                           // minimize images
            .pipe(gulp.dest('./public/images'));        // destination for optimized images
    });
});

gulp.task('image:build', function(){                    // Task to relocate images from frontend folder to public folder
    gulp.src([                                          // path to files to build
        './frontend/images/**/*.jpg',
        './frontend/images/**/*.png',
        './frontend/images/**/*.svg',
        './frontend/images/**/*.gif'
    ])
        .pipe(imagemin())                               // minimize images
        .pipe(gulp.dest('./public/images'));            // destination for optimized images
});

gulp.task('javascripts:watch', ['javascripts:build'], function(){   // Task for watching new and deleted scripts, task javascripts:build runs before this task is running
    return watch('./frontend/javascripts/**/*.js', function () {    // Path to watching files
        gulp.src('./frontend/javascripts/**/*.js')                  // Path to bulild files
            .pipe(gulp.dest('./public/js'));                        // destination for optimized scripts
    });
});

gulp.task('javascripts:build', function(){              // Task to relocate scripts from frontend folder to public folder
    gulp.src('./frontend/javascripts/**/*.js')          // Path to scripts
        .pipe(gulp.dest('./public/js'));                // destination for optimized scripts
});

gulp.task('main-bower-files', function() {                      // Task to put bower downloaded files from bower components
    var filterJS = gulpFilter('**/*.js', { restore: true });    // Filter to put only js files
    return gulp.src('./bower.json')                             // In this file task watch what packages you want to get in dependencies or devDependencies
        .pipe(mainBowerFiles( ))                                // Puts files from bower components
        .pipe(filterJS)                                         // Filter only js files
        .pipe(flatten())                                        // Remove directories
        .pipe(gulp.dest('./public/js/libs'));                        // Destination where to put main bower files
});

gulp.task('default', ['browser-sync', 'css', 'image:watch', 'javascripts:watch', 'main-bower-files', 'fonts']);

  