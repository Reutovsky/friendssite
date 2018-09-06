let gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	gp = require('gulp-load-plugins')();

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "./build"
		}
	});
});

gulp.task('pug', function() {
	return 
});

gulp.task('pug', function() {
    return gulp.src('src/pug/**/*.pug')
        .pipe(gp.pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
        .on('end',browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('src/static/sass/**/*.sass')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.sass({}))
        .pipe(gp.autoprefixer({
            browsers: ['last 3 versions']
        }))
        .on("error", gp.notify.onError({
            title: "style error"
        }))
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest('build/styles/'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('watch', function() {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/static/sass/**/*.sass', gulp.series('sass'))
});

gulp.task('default', gulp.series(
    gulp.parallel('pug', 'sass'),
    gulp.parallel('watch', 'serve')
));