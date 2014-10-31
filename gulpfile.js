var gulp = require('gulp');
var rimraf = require('rimraf');
var prettify = require('gulp-jsbeautifier');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var minifyCSS = require('gulp-minify-css');
var bower = require('gulp-bower');

gulp.task('default', ['test', 'bower', 'format-js', 'compress-js', 'format-css', 'minify-css']);

gulp.task('test', function(done) {
  console.log("test");
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./src/main/resources/static/lib'));
});

gulp.task('format-js', function() {
  gulp.src('./src/main/resources/static/**/*.js')
    .pipe(prettify({js:{
      indentSize: 2,
      maxPreserveNewlines: 2
     }}))
    .pipe(gulp.dest('./src/main/resources/static'));
});

gulp.task('compress-js', function() {
  rimraf('./src/main/resources/static/js/test.all.min.js', function() {
    console.log('./src/main/resources/static/js/test.all.min.js is deleted.');
  });
  gulp.src('./src/main/resources/static/**/*.js')
    .pipe(uglify('test.all.min.js', {
      /*
      outSourceMap: true,
      output: {
        source_map: {
          root: 'src/main/resources/static'
        }
      },
      */
      compress: {
        properties: false
      }
    }))
    .pipe(gulp.dest('./src/main/resources/static/js'));
});

gulp.task('format-css', function() {
  gulp.src('./src/main/resources/static/**/*.css', '!./src/main/resources/static/**/*.min.css')
    .pipe(prettify({css:{
      indentSize: 2,
     }}))
    .pipe(gulp.dest('./src/main/resources/static'));
});

gulp.task('minify-css', function() {
  gulp.src('./src/main/resources/static/**/*.css', '!./src/main/resources/static/**/*.min.css')
    .pipe(concat('all.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./src/main/resources/static/css'));
});
