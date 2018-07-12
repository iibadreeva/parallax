const gulp = require('gulp')
    , pug = require('gulp-pug')
    , fs = require('fs')
    , browserSync = require('browser-sync').create()
    , reload = browserSync.reload
    , sass = require('gulp-sass')
    , plumber = require('gulp-plumber')
    , sassGlob = require('gulp-sass-glob')
    , sourcemaps = require('gulp-sourcemaps')
    , csso = require('gulp-csso')
    , autoprefixer = require('gulp-autoprefixer');
    // , cssunit = require('gulp-css-unit');

// server
gulp.task('server', function() {
    browserSync.init({
        open: false,
        notify: false,
        server: {
            baseDir: ".",
        }
    });
});

gulp.task('sass', () => {
    return gulp.src('./source/sass/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers : ['> 5%'],
            cascade : false
        }))
        // .pipe(cssunit({
        //     type     :    'px-to-rem',
        //     rootSize  :    16
        // }))
        // .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'))
        .pipe(reload({stream : true}));
});

gulp.task('pug', () => {
    // let locals = require('./content.json');

    gulp.src('source/pug/index.pug')
    .pipe(plumber())
    .pipe(pug({
        // locals : locals
        pretty: true,
    }))
    .pipe(gulp.dest('.'))
    .pipe(reload({stream : true}));
});

gulp.task('watch', () => {
    gulp.watch('source/pug/**/*.pug', ['pug']);
    gulp.watch('source/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'pug', 'server', 'watch']);
