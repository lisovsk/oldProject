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
	haml 		= require('gulp-haml'),
	include     = require("gulp-include");

gulp.task('haml', function () {
	gulp.src('app/haml/index.haml')
	.pipe(include())
	.pipe(haml({
	  compiler: 'visionmedia'
	}))
	.pipe(gulp.dest('app/'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass({
		includePaths: ['app/scss/*.scss', 'app/scss/components/*.scss']
	}).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], {cascade: true}))
	.pipe(gulp.dest('app/assets/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
	return gulp.src([
		'app/js/common.js',
		'app/js/components/_banner.js',
		'app/js/components/_read-more.js'
	])
	.pipe(concat('common.min.js'))
	.pipe(gulp.dest('app/assets/js'))
	.pipe(browserSync.reload({stream: true}));
});
gulp.task('css-libs', ['sass'], function () {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});


gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app',
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
	 return gulp.src('app/assets/img/**/*')
	 .pipe(cache(imagemin({
	 	interlaced: true,
	 	progressive: true,
	 	svgoPlugins: [{removeViewBox:false}],
	 	une: [pngquant]
	 })))
	 .pipe(gulp.dest('dist/assets/img'));
});
gulp.task('watch', ['browser-sync', 'sass', 'css-libs', 'scripts', 'haml'], function () {
	gulp.watch('app/**/*.scss', ['sass']);
	gulp.watch('app/haml/**/*.haml', ['haml']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', ['scripts'], browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts', 'haml'], function () {
	var buildCss = gulp.src([
		'app/assets/css/styles.css',
		'app/assets/css/ie8.css'
	])
	.pipe(gulp.dest('dist/assets/css'));

	var buildFonts = gulp.src('app/assets/fonts/**/*')
	.pipe(gulp.dest('dist/assets/fonts'));

	var buildJs = gulp.src('app/assets/js/**/*')
	.pipe(uglify())
	.pipe(gulp.dest('dist/assets/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});
gulp.task('default', ['watch']);