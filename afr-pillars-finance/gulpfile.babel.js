'use strict'

import gulp from 'gulp';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import notify from 'gulp-notify';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import strip from 'gulp-strip-comments';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import minify from 'gulp-minify-css';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import runSequence from 'run-sequence';
import zip from 'gulp-zip';
import del from 'del';
const argv = require('yargs').argv;

gulp.task('vendor-js', () => {
    gulp.src([
            './source/shared/js/vendor/*.js',
            './source/shared/js/utils.js'
        ])
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(`./build/${argv.size}/`))
        .pipe(notify({
            message: 'Finished minifying vendor JavaScript'
        }));
})

gulp.task('js', () => {
    return gulp.src([
            `./source/${argv.size}/js/banner.js`
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(strip())
        .pipe(plumber.stop())
        .pipe(concat('banner.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(`./build/${argv.size}`))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', () => {
    return gulp.src(`./source/${argv.size}/index.html`)
        .pipe(gulp.dest(`./build/${argv.size}`))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('img', () =>
    gulp.src(`./source/${argv.size}/img/*`)
    .pipe(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]))
    .pipe(gulp.dest(`./build/${argv.size}`))
);

gulp.task('sass', () => {
    gulp.src(`./source/${argv.size}/sass/style.scss`)
        .pipe(sass())
        .pipe(minify())
        .pipe(gulp.dest(`./build/${argv.size}`))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', () => {
    gulp.watch([`./source/${argv.size}/js/banner.js`, `./source/${argv.size}/js/*.js`, `./source/${argv.size}/js/*/**.js`], ['js']);
    gulp.watch([`./source/${argv.size}/sass/**/*.scss`], ['sass']);
    gulp.watch([`./source/${argv.size}/img/*`], ['img']);
    gulp.watch([`./source/${argv.size}/*.html`], ['html']);
})

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: `./build/${argv.size}`
        }
    });
});

gulp.task('clean', del.bind(null, 'build/*', {
    dot: true
}))

gulp.task('build', (callback) => {
    runSequence('clean', ['vendor-js', 'js', 'sass', 'html', 'img'], 'zip', callback);
})

gulp.task('zip', () => {
    return gulp.src(`./build/${argv.size}/*`)
        .pipe(zip(`./${argv.size}.zip`))
        .pipe(gulp.dest(`./deploy`))
})

gulp.task('dev', ['vendor-js', 'js', 'sass', 'html', 'img', 'watch', 'serve']);
