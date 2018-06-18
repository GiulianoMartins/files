
/*
*
* yarn add gulp gulp-uglify gulp-concat gulp-sourcemaps gulp-clean gulp-imagemin gulp-notify gulp-cssnano jshint gulp-jshint gulp-compass gulp-autoprefixer gulp-noop browser-sync --dev
* yarn add jquery jquery-ui popper.js bootstrap jquery-parallax.js scrollreveal
*
* // initialize NODE_ENV
* export NODE_ENV=development
*/

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    notify = require("gulp-notify"),
    cssnano = require("gulp-cssnano"),
    jshint = require('gulp-jshint'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    noop = require("gulp-noop"),
    browserSync = require('browser-sync').create();

    console.log(process.env.NODE_ENV);


var config = {
    scripts: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery-ui/jquery-ui.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery-parallax.js/parallax.min.js'
    ],
    css: [
       'node_modules/jquery-ui/themes/smoothness/jquery-ui.min.css',
       'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ],
    fontssrc: [
        'node_modules/bootstrap/dist/fonts/*.*',
        'src/fonts/*.*'
    ],

    scriptssrc: "src/scripts/*.js",
    sasssrc: 'src/styles/*.scss',
    imagessrc: ['src/images/**/*.png', 'src/images/**/*.{jpg,jpeg,png,gif,svg}'],
    fontsout: 'dist/fonts',
    cssout: 'dist/css',
    jsout: 'dist/js',
    imgsout: 'dist/imgs'
}


// Synchronously delete the output style files (css,js,fonts)
gulp.task('clean-js', function (cb) {
    return gulp.src(config.jsout, { read: false })
    .pipe(clean())
});

gulp.task('clean-css', function (cb) {
    return gulp.src(config.cssout, { read: false })
    .pipe(clean())
});

gulp.task('clean-imgs', function (cb) {
    return gulp.src(config.imgsout, { read: false })
    .pipe(clean())
});

gulp.task('clean-fonts', function (cb) {
    return gulp.src(config.fontsout, { read: false })
    .pipe(clean())
});



// Styles
gulp.task('css-app',['clean-css'], function () {
    return gulp.src(config.css)
     .pipe(concat('app.css'))
     .pipe(gulp.dest(config.cssout))
     .pipe(process.env.NODE_ENV === 'production' ? cssnano() : noop())
     .pipe(concat('app.min.css'))
     .pipe(gulp.dest(config.cssout));
});

// Styles
gulp.task('styles', ['css-app'], function () {
    return gulp.src(config.sasssrc)
        .pipe(compass({
            sass: 'src/styles',
            css: config.cssout
        }))
        .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9'))
        .pipe(process.env.NODE_ENV === 'production' ? cssnano() : noop())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(config.cssout))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'Styles Generated!' }));
});

gulp.task('fonts', ['clean-fonts'],function () {
    return gulp.src(config.fontssrc)
        .pipe(gulp.dest(config.fontsout));
});


//Create a jquery bundled file
gulp.task('scripts-bundle',['clean-js'], function () {
    return gulp.src(config.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts-bundle.min.js'))
        .pipe(process.env.NODE_ENV === 'production' ? uglify() : noop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.jsout));
});

// Concatenate & Minify JS
gulp.task('scripts', ['scripts-bundle'], function () {
    gulp.src(config.scriptssrc)
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('fail'))
        .pipe(concat('all.min.js'))
        .pipe(process.env.NODE_ENV === 'production' ? uglify() : noop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.jsout))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'Scripts Generated!' }));
});

//images optimization
gulp.task('images', ['clean-imgs'], function () {
    gulp.src(config.imagessrc)
        .pipe(imagemin({
            optimizationLevel: 3,
            progessive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.imgsout))
        .pipe(notify({ message: 'Images Optimazed!' }));
});

//browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        //proxy: "http://dev.bender:8888/_boilerplate/wordpress/"
        proxy: "http://localhost/onlive/"
    });
    
});


// Watch Files For Changes/*
gulp.task('watch', function () {
    gulp.watch('src/scripts/*.js', ['scripts']);
    gulp.watch('src/styles/*.scss', ['styles']);
    gulp.watch('src/images/*.*', ['images']);
    gulp.watch("./*.php").on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'fonts', 'scripts', 'images', 'browser-sync', 'watch']);










