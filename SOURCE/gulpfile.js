import gulp from 'gulp';
import autoPrefixer from 'gulp-autoprefixer';
import gulpConcat from 'gulp-concat';
import gulpNoop from 'gulp-noop';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpTerser from'gulp-terser';
import gulpWrapper from 'gulp-wrapper';
import gulpCleanCss from 'gulp-clean-css';
import gulpCache from 'gulp-cached';
import gulpIf from 'gulp-if';

const { src, dest, series, watch, parallel } = gulp;
const sass = gulpSass(dartSass);
const bsServer = browserSync.create();

/* ======================================================================== */
/* SETUP */
/* ======================================================================== */
const
  compilation = {
    src: '.', // source dir (current)
    dist: '../HTML', // compilation dir
    minify: true
  };

/* ======================================================================== */
/* PATHS TO RESOURCES */
/* ======================================================================== */
const
  path = {
    vendor: {
      styles: [
        compilation.src + '/static/sass/libraries/*.css',
        compilation.src + '/static/sass/libraries/*.sass',
      ],
      scripts: [
        compilation.src + '/static/js/framework/*.js',
        compilation.src + '/static/js/libraries/*.js',
        compilation.src + '/static/js/plugins/*.js'
      ]
    },
    components: {
      styles: [
        compilation.src + '/static/sass/helpers/*.sass',
        compilation.src + '/static/sass/mixins.sass',
        compilation.src + '/static/sass/vars.sass',
        compilation.src + '/static/sass/*.sass',
        compilation.src + '/components/**/*.sass',
      ],
      scripts: [
        compilation.src + '/static/js/common.js',
        compilation.src + '/components/_base/*.js',
        compilation.src + '/components/{**,!_base}/*.js'
      ]
    },
    watch: [
      compilation.dist + '/**/*.*', // watch for all files changes in compilation dir
      '!' + compilation.dist + '/**/*.+(js|css|map)', // don't watch for files that are complied (those are handled by browser-sync)
    ]
  };

/* ======================================================================== */
/* VENDOR RESOURCES */
/* ======================================================================== */
// Add this function to check if file has changed
function hasFileChanged(file) {
  return !gulpCache.caches['styles'] || !gulpCache.caches['styles'][file.path];
}

function vendorCSS() {
  return src(path.vendor.styles)
    .pipe(plumber())
    .pipe(gulpCache('styles'))
    .pipe(gulpIf(hasFileChanged, sass({
      allowEmpty: true
    }).on('error', sass.logError)))
    .pipe(gulpIf(hasFileChanged, gulpConcat('vendor.css')))
    .pipe(gulpIf(hasFileChanged, gulpCleanCss()))
    .pipe(dest(compilation.dist + '/css'))
    .pipe(bsServer.reload({
      stream: true
    }));
}

function vendorJS() {
  return src(path.vendor.scripts)
    .pipe(plumber())
    .pipe(gulpConcat('vendor.js'))
    .pipe(dest(compilation.dist + '/js'))
    .pipe(bsServer.reload({
      stream: true
    }));
}

/* ======================================================================== */
/* COMPONENTS RESOURCES */
/* ======================================================================== */
function componentsCSS() {
  return src(path.components.styles)
    .pipe(plumber())
    .pipe(gulpCache('styles'))
    .pipe(gulpIf(hasFileChanged, compilation.minify ? gulpNoop() : gulpSourcemaps.init()))
    .pipe(gulpIf(hasFileChanged, gulpConcat('main.sass')))
    .pipe(gulpIf(hasFileChanged, sass({
      allowEmpty: true,
      outputStyle: compilation.minify ? 'compressed' : 'expanded'
    }).on('error', sass.logError)))
    .pipe(gulpIf(hasFileChanged, autoPrefixer()))
    .pipe(gulpIf(hasFileChanged, compilation.minify ? gulpNoop() : gulpSourcemaps.write('/')))
    .pipe(dest(compilation.dist + '/css'))
    .pipe(bsServer.reload({
      stream: true
    }));
}

// Add this near your other functions
function hasScriptChanged(file) {
  return !gulpCache.caches['scripts'] || !gulpCache.caches['scripts'][file.path];
}

function componentsJS() {
  return src(path.components.scripts)
    .pipe(plumber())
    .pipe(gulpCache('scripts'))
    .pipe(gulpIf(hasScriptChanged, compilation.minify ? gulpNoop() : gulpSourcemaps.init()))
    .pipe(gulpIf(hasScriptChanged, gulpConcat('components.js')))
    .pipe(gulpIf(hasScriptChanged, gulpWrapper({
      header: '(function ($) {\n\n\'use strict\';\n\n',
      footer: '\n\n})(jQuery);\n'
    })))
    .pipe(gulpIf(hasScriptChanged, compilation.minify ? gulpNoop() : gulpSourcemaps.write('/')))
    .pipe(gulpIf(hasScriptChanged, compilation.minify ? gulpTerser() : gulpNoop()))
    .pipe(dest(compilation.dist + '/js'))
    .pipe(bsServer.reload({
      stream: true
    }));
}

/* ======================================================================== */
/* BROWSER SYNC */
/* ======================================================================== */
function browserSyncCreate(done) {
  bsServer.init({
    server: compilation.dist,
    cors: true
  });

  done();
}

function browserSyncReload(done) {
  bsServer.reload();
  done();
}

/* ======================================================================== */
/* WATCHER */
/* ======================================================================== */
function watcher() {
  watch(path.vendor.styles, vendorCSS);
  watch(path.vendor.scripts, vendorJS);
  watch(path.components.styles, componentsCSS);
  watch(path.components.scripts, componentsJS);
  watch(path.watch, browserSyncReload);
}

export default series(
  parallel(vendorCSS, vendorJS, componentsCSS, componentsJS),
  browserSyncCreate,
  watcher
);
