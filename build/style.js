var gulp = require("gulp"),
	concat = require("gulp-concat-css"),
	watch = require("gulp-watch"),
	gutil = require("gulp-util"),
	less = require("gulp-less"),
	minify = require("gulp-minify-css");

gulp.task("style", function() {
	return _buildTask();
});

gulp.task("watch-style", ["style"], function() {
	watch(["assets/**/*.css", "src/style/**/*.less"], function() {
		gutil.log("Styles updated.");
		_buildTask();
	});
});

gulp.task("style-prod", function() {
	return _buildTask(true);
});

function _buildTask(prod) {
	var stream = gulp.src(["assets/**/*.css", "src/style/**/*.less"])
		.pipe(less())
		.pipe(concat("bundle.css"));
	
	if (prod)
		stream = stream.pipe(minify({
			keepSpecialComments: 0
		}));
	
	return stream.pipe(gulp.dest("dist/"));
}