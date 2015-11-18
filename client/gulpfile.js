/* works as a run file
   this file will create a new directory called dist that will contain: main.js, index.html
*/

/* require includes modules that exist in separate files
   functionality: it reads a js file, executes the file and returns the .exports object
   if there are multiple calls (of the same module) to require, the module cache  will be
   invoked rather than reading the file again
*/
var gulp = require('gulp'); //gulp: automated task runner
var browserify = require('browserify'); //browserfy: organizes and compiles code distributed in multiple modules
var reactify = require('reactify'); //reactify: translates the jsx code to js
var myCss = require('gulp-import-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var babelify = require('babelify');
var connect = require('gulp-connect');
var del = require('del');
var runSequence = require('run-sequence');

/* when using gulp with browserify:
   gulp requires that the input should be a stream
   browserify outputs a string
*/
var source = require('vinyl-source-stream'); //converts a string to a stream

var sourcePath = {
			index: 'src/index.html',
			css: 'js/styles.css',
			sourceAssets: 'src/assets/**/*.*',
			sourceMain: './src/js/main.js',
			main: 'main.js',
			sourceFonts: 'node_modules/bootstrap/fonts/*',
			sourceMap: './'
		},
		destinationPath = {
			distJs: 'dist/js',
			dist: 'dist',
			delDist: 'dist/*',
			destAssets: 'dist/assets/',
			destFonts: 'dist/fonts/'
		},
		watchPath = {
			runSource: 'src/**/*.*',
			watch: 'watch'
		},
		tasks = {
			browserify: 'browserify',
			babelify: 'babelify',
			react: 'react',
			copy: 'copy',
			deleteBuild: 'deleteBuild',
			connect: 'connect',
			defaultTask: 'default'
		}



//--------------------------------------TASKS------------------------------------------------------------------

gulp.task(tasks.browserify, function() {
	return browserify(sourcePath.sourceMain,{ debug: true } ) //when calling browserify the argument should be the the entry point of the application
	 .transform(tasks.babelify, {presets: [tasks.react]}) //transforms from jsx to js
	 .bundle()	//the output of the transform will be here

	 .pipe(source(sourcePath.main))//takes as input the output of bundle and transforms it to a stream
	 .pipe(buffer())
	 .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
	 .pipe(uglify().on('error', gutil.log))
	 .pipe(sourcemaps.write(sourcePath.sourceMap)) // writes .map file
	 .pipe(gulp.dest(destinationPath.distJs))
	 .pipe(connect.reload());
}); //end of gulp task

gulp.task(tasks.copy, function(){
	// copies the file given as input to the destination file given in pipe
	gulp.src(sourcePath.index)
	 	.pipe(gulp.dest(destinationPath.dist));

	gulp.src(sourcePath.sourceAssets)
		.pipe(myCss())
	 	.pipe(gulp.dest(destinationPath.destAssets));

	gulp.src(sourcePath.sourceFonts)
	 	.pipe(gulp.dest(destinationPath.destFonts));


});

gulp.task(tasks.deleteBuild, function() {
  del(destinationPath.delDist);
});

gulp.task(tasks.connect, function() {
  return connect.server({
    root: destinationPath.dist,
    livereload: true
  });
});

gulp.task(watchPath.watch, [tasks.browserify, tasks.copy], function(){ //in [] we run the tasks from above
	// **, *.* means anything
	// .watch creates a watcher that will spy on files that are mat
	return gulp.watch(watchPath.runSource, [tasks.browserify, tasks.copy]); //we re-run browserify and copy
});

gulp.task(tasks.defaultTask, function() {
	runSequence(tasks.deleteBuild, 
		[tasks.connect, watchPath.watch]
	)
});