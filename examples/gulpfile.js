var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var uncss = require('gulp-uncss');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
var critical  = require('critical');
var extReplace = require('gulp-ext-replace');
var imagemin = require('gulp-imagemin');
var imageminMozjpeg = require('imagemin-mozjpeg');
var webp = require('imagemin-webp');


// Compress images
gulp.task('imagemin', () => {
  return gulp.src('img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('img/'))
});

gulp.task('webp', () => {
  return gulp.src('img/**/*.{jpg,png}')
    .pipe(imagemin([
      webp({
        quality: 80,
        preset: 'photo',
        method: 6
      })
    ]))
    .pipe(extReplace('.webp'))
    .pipe(gulp.dest('img/'))
});

gulp.task('mozjpeg', () =>
    gulp.src('img/**/*.jpg')
    .pipe(imagemin([imageminMozjpeg({
        quality: 85
    })]))
    .pipe(gulp.dest('img'))
);

gulp.task('image', ['imagemin', 'webp', 'mozjpeg'])


// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./vendor/font-awesome'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./vendor/jquery-easing'))

  // Magnific Popup
  gulp.src([
      './node_modules/magnific-popup/dist/*'
    ])
    .pipe(gulp.dest('./vendor/magnific-popup'))

  // Scrollreveal
  gulp.src([
      './node_modules/scrollreveal/dist/*.js'
    ])
    .pipe(gulp.dest('./vendor/scrollreveal'))

});

// Compile SCSS

gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});


// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// UnCSS

gulp.task('uncss', function () {
    return gulp.src('./vendor/**/*.css')
      .pipe(uncss({
          html: ['index.html']
      }))
      .pipe(gulp.dest('./vendor/**/*.un.css'));
});

// CSS
gulp.task('css', ['css:compile','css:minify']);

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Above first fold css fix

gulp.task('critical', ['css'], function () {
    critical.generate({
        inline: true,
        src: 'index.html',
        dest: 'index.html',
        minify: true,
        width: 1920,
        height: 1080,
    });
});


// Dev task

gulp.task('dev', ['css', 'js', 'browserSync'], function() {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});
