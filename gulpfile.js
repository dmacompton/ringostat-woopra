(function () {
  'use strict';

  const gulp = require('gulp');
  const concat = require('gulp-concat');
  const rename = require('gulp-rename');
  const autoprefixer = require('gulp-autoprefixer');
  const minifyCss = require('gulp-minify-css');
  const sass = require('gulp-sass');
  const plumber = require('gulp-plumber');
  const debug = require('gulp-debug');
  const path = require('path');
  
  var onError = function(err) {
    console.log(err);
    this.emit('end');
  };

  gulp.task('css', function () {
    gulp.src('./assets/sass/material-kit.scss')
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(debug({title: 'src'}))
      .pipe(sass())
      .pipe(debug({title: 'sass'}))
      .pipe(autoprefixer('last 15 versions'))
      .pipe(debug({title: 'prefixer'}))
      .pipe(concat('main.css'))
      .pipe(debug({title: 'concat'}))
      .pipe(minifyCss())
      .pipe(debug({title: 'minify'}))
      .pipe(rename('style.min.css'))
      .pipe(debug({title: 'dest'}))
      .pipe(gulp.dest('./'));
  });

  gulp.task('landing:watch', function () {
    gulp.watch('assets/sass/**/*.scss', ['css']);
  });

})();