var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');

var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',

  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJS: 'tmp/**/*.js',

  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'tmp/**/*.css',
  distJS: 'dist/**/*.js'
};

gulp.task('hello', function() {
  console.log('Hello World!');
});

gulp.task('default', function() {
  console.log('Default task from gulpfile.js...');
})

/* Setup the HTML task to copy all HTML files from src to tmp directory where you'll be running the web server */
gulp.task('html', function() {
  return gulp.src(paths.srcHTML)
    .pipe(gulp.dest(paths.tmp));
});

/* Setup the CSS task */
gulp.task('css', function() {
  return gulp.src(paths.srcCSS)
    .pipe(gulp.dest(paths.tmp));
});

/* Setup the JavaScript task */
gulp.task('js', function() {
  return gulp.src(paths.srcJS)
    .pipe(gulp.dest(paths.tmp));
});

/* Combine all tasks into one task */
gulp.task('copy', ['html', 'css', 'js']);

/* Inject CSS and JavaScript into the index.html */
gulp.task('inject', ['copy'], function() {
  var css = gulp.src(paths.tmpCSS);
  var js = gulp.src(paths.tmpJS);
  return gulp.src(paths.tmpIndex)
    .pipe(inject(css, { relative: true } ))
    .pipe(inject(js, { relative: true } ))
    .pipe(gulp.dest(paths.tmp));
});

/* Serve the development web server */
gulp.task('serve', ['inject'], function() {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
});

/* Watch src directory for changes and reload the web server */
gulp.task('watch', ['serve'], function() {
  gulp.watch(paths.src, ['inject']);
});
