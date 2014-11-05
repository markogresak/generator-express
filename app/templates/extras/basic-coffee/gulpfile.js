var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload');<% if(options.cssPreprocessor == 'sass'){ %>
  var sass = require('gulp-ruby-sass');<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
  var sass = require('gulp-sass');<% } %>
<% if(options.cssPreprocessor == 'sass'){ %>
gulp.task('sass', function () {
    return gulp.src('./public/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
gulp.task('sass', function () {
    gulp.src('./public/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});<% } %>

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js coffee <%= options.viewEngine %>',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed();
    }, 500);
  });
});

gulp.task('default', [<% if(options.cssPreprocessor == 'sass' || options.cssPreprocessor == 'node-sass'){ %>
  'sass',<% } %>
  'develop'<% if(options.cssPreprocessor == 'sass' || options.cssPreprocessor == 'node-sass'){ %>,
  'watch'<% } %>
]);