var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
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
  distCSS: 'dist/**/*.css',
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

/* Building the dist */
/* Setup html task to copy & clean html files from src to dist directory */
gulp.task('html:dist', function() {
  return gulp.src(paths.srcHTML)
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});

/* Setup css task to copy, concat and clean css files from src to dist directory */
gulp.task('css:dist', function() {
  return gulp.src(paths.srcCSS)
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist));
})

/* Setup js task to copy, concat and uglify js files from src to dist directory */
gulp.task('js:dist', function() {
  return gulp.src(paths.srcJS)
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

/* Combine all building dist tasks together */
gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist']);

/* Inject css and js files to index.html in dist folder */
gulp.task('inject:dist', ['copy:dist'], function() {
  var css = gulp.src(paths.distCSS);
  var js = gulp.src(paths.distJS);
  return gulp.src(paths.distIndex)
    .pipe(inject(css, {relative: true }))
    .pipe(inject(js, {relative: true }))
    .pipe(gulp.dest(paths.dist));
})

gulp.task('build', ['inject:dist']);

