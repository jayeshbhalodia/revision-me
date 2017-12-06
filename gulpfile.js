//
var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');


gulp.task('sass', function () {
  return gulp.src('./public/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});



//
gulp.task('default', function() {

	//
	nodemon({
		script: 'index.js',
		ext: 'js html',
		env: {
			'NODE_ENV': 'development'
		}
	});


	//
  	gulp.watch('./public/sass/*.scss', ['sass']);
});