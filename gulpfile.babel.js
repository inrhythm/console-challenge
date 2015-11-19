'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import rename from 'gulp-rename';
import taskListing from 'gulp-task-listing';
import uglify from 'gulp-uglify';

gulp.task('help', taskListing);
gulp.task('default', taskListing);

gulp.task('clean', (done) => {
  return del(['dist'], done);
});

gulp.task('dist', ['clean'], () => {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

