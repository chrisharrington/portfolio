var gulp = require("gulp"),
	runSequence = require("gulp-run-sequence");

gulp.task("prod", ["clean"], function() {
	runSequence(["assets", "script-prod", "style-prod", "html"]);
});