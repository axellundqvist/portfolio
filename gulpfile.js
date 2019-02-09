'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass'); // for sass
var uglifycss = require('gulp-uglifycss'); // for css
var uglify = require('gulp-uglify-es').default;
var imagemin = require('gulp-imagemin'); // for images
var concat = require('gulp-concat'); // for merging and compressing
var pump = require('pump');



gulp.task('message', function(){
    return console.log('All systems are go...');
});
 

// Turn sass into css and merge
gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('sassstyle.css'))
    .pipe(gulp.dest('src/css'));
});



// Compress and "merge"
gulp.task('css', function(){
    return gulp.src('src/css/*.css')
    .pipe(concat('style.css'))
    .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
      }))
    .pipe(gulp.dest('pub/css'));
});


//Scripts
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('pub/js'));
});




// copy html files
gulp.task('copyhtml', function() {
return gulp.src('src/*.html')
.pipe(gulp.dest('pub/'));
});

gulp.task('copyphp', function() {
    return gulp.src('src/*.php')
    .pipe(gulp.dest('pub/'));
    });

gulp.task('copyincludes', function() {
    return gulp.src('src/includes/*.php')
    .pipe(gulp.dest('pub/includes'));
});

gulp.task('copyclasses', function() {
    return gulp.src('src/classes/*.php')
    .pipe(gulp.dest('pub/classes'));
});


// optimize images
gulp.task('imageMin', () =>
gulp.src('src/images/*')
.pipe(imagemin())
.pipe(gulp.dest('pub/images')));



// Automate moving and compressing process 

gulp.task('run', ['sass', 'css', 'scripts', 'copyhtml', 'imageMin', 'copyphp', 'copyincludes', 'copyclasses']);

// Listens for changes in all folders of the src
gulp.task('watch', function(){
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/*.html', ['copyhtml']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/*php', ['copyphp']);
    gulp.watch('src/includes/*.php', ['copyincludes']);
    gulp.watch('src/classes/*.php', ['copyclasses']);
});


gulp.task('default', ['message', 'run', 'watch']); /* Starta med gulp, sluta med ctr + C. Kör igång alla watchers och kör default */