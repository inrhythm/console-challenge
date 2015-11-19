'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import del from 'del';
import eslint from 'gulp-eslint';
import rename from 'gulp-rename';
import taskListing from 'gulp-task-listing';
import uglify from 'gulp-uglify';

gulp.task('help', taskListing);
gulp.task('default', taskListing);

gulp.task('lint', () => {
  return gulp.src('src/*.js')
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean', ['lint'], (done) => {
  return del(['dist'], done);
});

gulp.task('dist', ['clean'], () => {
  return gulp.src([
    'node_modules/devtools-detect/index.js',
    'src/*.js'
  ])
    .pipe(babel())
    .pipe(concat('console-challenge.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

