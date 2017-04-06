/*******************************
Set-up
*******************************/

var gulp = require('gulp'),
    elixir = require('laravel-elixir'),
    lec = require('gulp-line-ending-corrector'),
    // linting
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    packageJSON = require('./package.json'),
    jshintConf = packageJSON.jshintConf;

/*
|--------------------------------------------------------------------------
| Elixir Asset Management
|--------------------------------------------------------------------------
|
| Elixir provides a clean, fluent API for defining some basic Gulp tasks
| for your Laravel application. By default, we are compiling the Sass
| file for our application, as well as publishing vendor resources.
|
*/

gulp.task('lec', function() {
    gulp.src('cs/cmd/*.js')
    .pipe(lec({verbose:true, eolc: 'LF', encoding:'utf8'}));
    gulp.src('cs/lib/*.js')
    .pipe(lec({verbose:true, eolc: 'LF', encoding:'utf8'}));
});

/*--------------
Lint
---------------*/

gulp.task('lint_cmd', function() {
    jshintConf.lookup = false;
    return gulp.src('cs/cmd/*.js')
    .pipe(jshint(jshintConf))
    .pipe(jshint.reporter(stylish));
});

gulp.task('lint_lib', function() {
    jshintConf.lookup = false;
    return gulp.src('cs/lib/*.js')
    .pipe(jshint(jshintConf))
    .pipe(jshint.reporter(stylish));
});

elixir(function(mix) {
    mix.less('./templates/default/less/AdminLTE.less', './templates/default/assets/css');
    // mix.less('./templates/default/less/skins/skin-black-light.less', './templates/default/assets/css/skins/skin-black-light.css');
    // mix.less('./templates/default/less/skins/skin-blue-light.less', './templates/default/assets/css/skins/skin-blue-light.css');
    // mix.less('./templates/default/less/skins/skin-green-light.less', './templates/default/assets/css/skins/skin-green-light.css');
    // mix.less('./templates/default/less/skins/skin-purple-light.less', './templates/default/assets/css/skins/skin-purple-light.css');
    // mix.less('./templates/default/less/skins/skin-red-light.less', './templates/default/assets/css/skins/skin-red-light.css');
    // mix.less('./templates/default/less/skins/skin-yellow-light.less', './templates/default/assets/css/skins/skin-yellow-light.css');
    // mix.less('./templates/default/less/skins/skin-black.less', './templates/default/assets/css/skins/skin-black.css');
    // mix.less('./templates/default/less/skins/skin-blue.less', './templates/default/assets/css/skins/skin-blue.css');
    // mix.less('./templates/default/less/skins/skin-green.less', './templates/default/assets/css/skins/skin-green.css');
    // mix.less('./templates/default/less/skins/skin-purple.less', './templates/default/assets/css/skins/skin-purple.css');
    // mix.less('./templates/default/less/skins/skin-red.less', './templates/default/assets/css/skins/skin-red.css');
    // mix.less('./templates/default/less/skins/skin-yellow.less', './templates/default/assets/css/skins/skin-yellow.css');
    mix.less('./templates/default/less/skins/*.less', './templates/default/assets/css/skins/skins-all.css');
});
