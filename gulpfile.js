/*******************************
            Set-up
*******************************/

var
  gulp         = require('gulp'),
  elixir = require('laravel-elixir');
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

elixir(function(mix) {
    mix.less('./themes/default/less/AdminLTE.less', './themes/default/assets/css');
    // mix.less('./themes/default/less/skins/skin-black-light.less', './themes/default/assets/css/skins/skin-black-light.css');
    // mix.less('./themes/default/less/skins/skin-blue-light.less', './themes/default/assets/css/skins/skin-blue-light.css');
    // mix.less('./themes/default/less/skins/skin-green-light.less', './themes/default/assets/css/skins/skin-green-light.css');
    // mix.less('./themes/default/less/skins/skin-purple-light.less', './themes/default/assets/css/skins/skin-purple-light.css');
    // mix.less('./themes/default/less/skins/skin-red-light.less', './themes/default/assets/css/skins/skin-red-light.css');
    // mix.less('./themes/default/less/skins/skin-yellow-light.less', './themes/default/assets/css/skins/skin-yellow-light.css');
    // mix.less('./themes/default/less/skins/skin-black.less', './themes/default/assets/css/skins/skin-black.css');
    // mix.less('./themes/default/less/skins/skin-blue.less', './themes/default/assets/css/skins/skin-blue.css');
    // mix.less('./themes/default/less/skins/skin-green.less', './themes/default/assets/css/skins/skin-green.css');
    // mix.less('./themes/default/less/skins/skin-purple.less', './themes/default/assets/css/skins/skin-purple.css');
    // mix.less('./themes/default/less/skins/skin-red.less', './themes/default/assets/css/skins/skin-red.css');
    // mix.less('./themes/default/less/skins/skin-yellow.less', './themes/default/assets/css/skins/skin-yellow.css');
    mix.less('./themes/default/less/skins/*.less', './themes/default/assets/css/skins/skins-all.css');
});

/*--------------
      Lint
---------------*/

gulp.task('lint', function() {
    jshintConf.lookup = false;
    return gulp.src('cs/*.js')
        .pipe(jshint(jshintConf))
        .pipe(jshint.reporter(stylish));
});
