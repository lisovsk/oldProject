var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglifyjs'),
	cssnano     = require('gulp-cssnano'),
	rename      = require('gulp-rename'),
	del         = require('del'),
	imagemin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	cache       = require('gulp-cache'),
	autoprefixer= require('gulp-autoprefixer'),
	sourcemaps  = require('gulp-sourcemaps'),
	ngAnnotate  = require('gulp-ng-annotate');


gulp.task('sass', function () {
	return gulp.src('project/scss/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: ['project/scss/*.scss', 'project/scss/components/*.scss']
	}).on('error', sass.logError))
	.pipe(autoprefixer(['last 2 version'], {cascade: true}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('project/assets/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('css-libs', ['sass'], function () {
	return gulp.src(['project/libs/angular-material/angular-material.css', 'project/libs/angular-loading-bar/build/loading-bar.css'])
	.pipe(concat('lib.css'))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('project/assets/css'));
});

gulp.task('angular', function () {
 gulp.src(['project/app/app.module.js', 'project/app/app.constants.js', 'project/app/**/*.js'])
   .pipe(sourcemaps.init())
     .pipe(concat('app.js'))
     .pipe(ngAnnotate())
     .pipe(uglify())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('project/assets/js'))
   .pipe(browserSync.reload({stream: true}));
})

gulp.task('js-lib', function () {
  gulp.src(['project/libs/angular/angular.js',
 			'project/libs/angular-aria/angular-aria.js',
 			'project/libs/angular-animate/angular-animate.js',
 			'project/libs/angular-material/angular-material.js',
 			'project/libs/angular-messages/angular-messages.js',
 			'project/libs/material-angular-paging-master/build/dist.min.js',
 			'project/libs/angular-loading-bar/build/loading-bar.js'
 			])
   .pipe(sourcemaps.init())
     .pipe(concat('js-lib.js'))
     .pipe(ngAnnotate())
     .pipe(uglify())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('project/assets/js'));
})


gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'project',
			notify:  false
		}
	});
});

gulp.task('clean', function () {
	return del.sync('dist');
});
gulp.task('clear', function () {
	return cache.clearAll();
});
gulp.task('img', function () {
	 return gulp.src('project/assets/images/**/*')
	 .pipe(cache(imagemin({
	 	interlaced: true,
	 	progressive: true,
	 	svgoPlugins: [{removeViewBox:false}],
	 	une: [pngquant]
	 })))
	 .pipe(gulp.dest('dist/assets/images'));
});
gulp.task('watch', ['browser-sync', 'sass', 'css-libs', 'angular'], function () {
	gulp.watch('project/**/*.scss', ['sass']);
	gulp.watch('project/**/*.html', browserSync.reload);
	gulp.watch('project/app/**/*.js', ['angular'], browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'angular'], function () {
	var buildCss = gulp.src([
		'project/assets/css/styles.css',
		'project/assets/css/lib.min.css'
	])
	.pipe(gulp.dest('dist/assets/css'));

	// var buildFonts = gulp.src('project/assets/fonts/**/*')
	// .pipe(gulp.dest('dist/assets/fonts'));

	var buildJs = gulp.src('project/assets/js/*.js')
	.pipe(gulp.dest('dist/assets/js'));

	var buildHtml = gulp.src(['project/**/*.html', 'project/*.html'])
	.pipe(gulp.dest('dist'));
});
gulp.task('default', ['watch']);