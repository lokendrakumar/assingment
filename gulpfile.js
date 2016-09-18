var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    less        = require('gulp-less'),
    cssnano     = require('gulp-cssnano'),
    del         = require('del'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    notify      = require('gulp-notify');


var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');



gulp.task('bower-js', function() {
    gulp.src(
        
        [   'bower_components/jquery/dist/jquery.min.js',
            'bower_components/selectize/dist/js/standalone/selectize.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-selectize2/dist/angular-selectize.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/ngstorage/ngStorage.min.js',
            "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
        ])
        .pipe(concat('vendors.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('public/scripts/'))
        // .pipe(notify({ message: 'Bower components compiled' }));
});


gulp.task('scripts', function() {
    gulp.src(['app/src/**/*.js'])
        // .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/scripts/'))
        // .pipe(notify({ message: 'All Scripts compiled' }));
});


gulp.task('styles', function() {
    gulp.src(['app/less/style.less',
                'bower_components/selectize/dist/css/selectize.default.css',
                'bower_components/bootstrap/dist/css/bootstrap.min.css',
                "bower_components/fontawesome/css/font-awesome.min.css",
                "bower_components/fontawesome/fonts/*"
            ])
        .pipe(less())
        .pipe(cssnano())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/styles/'))
        // .pipe(notify({ message: 'All Styles compiled' }));
});



gulp.task('views', function() {
    gulp.src('app/views/**/*.html')
        .pipe(gulp.dest('public/views/'))
        // .pipe(notify({ message: 'All HTML Files compiled' }));
});


gulp.task('index', function() {
    gulp.src('app/index.html')
        .pipe(gulp.dest('public/'))
        // .pipe(notify({ message: 'Index HTML compiled' }));
});


/**
 * **********************************
 * @default
 * Run default commands
 * **********************************
 */
gulp.task('default', function() {
    gulp.start( 'bower-js', 'scripts', 'styles', 'views', 'index');
});


/**
 * **********************************
 * @watch
 * Watch for file changes and recompile as needed
 * **********************************
 */
gulp.task('watch', function() {

    // Watch .js files
    gulp.watch('app/src/**', ['bower-js', 'scripts']);

    // Watch .less files
    gulp.watch('app/less/**', ['styles']);

    // Watch views
    gulp.watch('app/views/**', ['views']);

    // Watch index file
    gulp.watch('app/index.html', ['index']);

});
