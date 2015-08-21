var gulp = require("gulp"),
	runSequence = require("gulp-run-sequence");

gulp.task("watch", ["clean"], function() {
	runSequence(["assets", "watch-script", "watch-style", "watch-html"]);
});