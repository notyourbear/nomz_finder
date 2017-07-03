const gulp = require('gulp')
const concat = require('gulp-concat-util')
const rename = require('gulp-rename')
const del = require('del')

const pug = require('gulp-pug')
const pugInheritance = require('gulp-pug-inheritance')

const rollup = require('rollup-stream')
const source = require('vinyl-source-stream')
const uglifyjs = require('uglify-es')
const composer = require('gulp-uglify/composer')
const pump = require('pump')
const minify = composer(uglifyjs, console)

const less = require('gulp-less')
const lessAutoprefix = require('less-plugin-autoprefix')
const autoprefix = new lessAutoprefix({ browsers: ['last 2 versions'] })
const LessPluginCleanCSS = require('less-plugin-clean-css')
const cleanCSSPlugin = new LessPluginCleanCSS({advanced: true})

const paths = {
  criticalLess: 'src/critical.less',
  dist: 'dist',
  firebaseInit: 'src/firebase/init.js',
  includes: 'temp/includes',
  nonCriticalLess: ['src/optionsBar/style.less', 'src/util.less', 'src/list/style.less', 'src/loader/loader.less'],
  scriptEntry: 'src/index.js',
  temp: 'temp',
  template: './src/index.pug',
}

function clean() {
  return del([paths.temp, paths.dist])
}

function cleanTemp() {
  return del([paths.temp])
}

function views() {
  return gulp.src(paths.template)
    .pipe(pugInheritance({basedir: paths.includes}))
    .pipe(pug())
    .pipe(rename('index.html'))
    .pipe(gulp.dest(paths.dist))
}

function inlineCSS() {
  return gulp.src(paths.criticalLess)
  .pipe(less({
    plugins: [autoprefix, cleanCSSPlugin]
  }))
  .pipe(rename('critical.css'))
  .pipe(gulp.dest(paths.includes))
}

function initFirebase() {
  return gulp.src(paths.firebaseInit)
  .pipe(rename('firebase.js'))
  .pipe(gulp.dest(paths.includes))
}

function scripts() {
  return rollup({
    entry: paths.scriptEntry
  })
  .pipe(source('main.js'))
  .pipe(gulp.dest(paths.dist))
}

function minifyScripts(cb) {
  pump([
    gulp.src(`${paths.dist}/main.js`),
    minify(),
    gulp.dest(paths.dist)
  ], cb)
}

function css() {
  return gulp.src(paths.nonCriticalLess)
  .pipe(less({
    plugins: [autoprefix, cleanCSSPlugin]
  }))
  .pipe(concat('style.css'))
  .pipe(gulp.dest(paths.dist))
}

function watch() {
  gulp.watch(paths.scriptEntry, scripts)
  gulp.watch(paths.template, gulp.series(gulp.parallel(inlineCSS, initFirebase), views, cleanTemp))
  gulp.watch(paths.criticalLess, gulp.series(gulp.parallel(inlineCSS, initFirebase), views, cleanTemp))
  gulp.watch(paths.nonCriticalLess, css)
}

const build = gulp.series(clean, gulp.parallel(inlineCSS, initFirebase), gulp.parallel(scripts, css), views, cleanTemp)
const prodBuild = gulp.series(clean, gulp.parallel(inlineCSS, initFirebase), gulp.parallel(gulp.series(scripts, minifyScripts), css), views, cleanTemp)

gulp.task('build', build)
gulp.task('prod', prodBuild)
gulp.task('default', build)
gulp.task('watch', watch)
gulp.task('clean', clean)
