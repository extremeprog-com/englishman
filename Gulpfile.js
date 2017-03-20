'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");

// function to errors catching
function wrapPipe(taskFn) {
  return function(done) {
    var onSuccess = function() {
      done();
    };
    var onError = function(err) {
      done(err);
    }
    var outStream = taskFn(onSuccess, onError);
    if(outStream && typeof outStream.on === 'function') {
      outStream.on('end', onSuccess);
    }
  }
}

gulp.task('default', function() {
  livereload.listen();

  var client = ['js', 'sass'];
  gulp.watch('src/js/**/*.js', client);
  gulp.watch('src/sass/**/*.scss', client);

});

// compile sass
gulp.task('sass', wrapPipe(function(success, error) {
  return gulp.src('./src/sass/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(concat('./style.min.css').on('error', error))
  .pipe(gulp.dest('./www/css'))
  .pipe(livereload());
}));

gulp.task('lib', wrapPipe(function (success, error) {
  return gulp.src(['bower_components/angular/angular.min.js', 'bower_components/angular-route/angular-route.min.js', 'bower_components/angular-sanitize/angular-sanitize.min.js', 'bower_components/ngToast/dist/ngToast.min.js', 'bower_components/angular-animate/angular-animate.min.js', 'bower_components/moment/moment.js'])
    .pipe(gulp.dest('./www/js/lib'))
    .pipe(livereload());
}));

 // task to concat and minify js
gulp.task('js', wrapPipe(function(success, error) {
  return gulp.src('src/js/**/*.js')
  // .pipe(concat('app.min.js').on('error', error))
  // .pipe(uglify().on('error', error))
  .pipe(babel())
  .pipe(gulp.dest('./www/js/'))
  .pipe(livereload());
}));

