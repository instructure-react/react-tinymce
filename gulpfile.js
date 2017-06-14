const gulp = require('gulp');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
var ghPages = require('gulp-gh-pages');

gulp.task('build:meta', () => {
  return gulp.src([ 'README.md', 'package.json' ])
    .pipe(gulp.dest('build'));
});

gulp.task('build', [ 'build:meta' ], () => {
  return gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/lib'));
});

gulp.task('example', () => {
  return bundle('./example/example.js', 'main.js', './example', true);
});

gulp.task('pages', [ 'example' ], function() {
  return gulp.src('./example/**/*')
    .pipe(ghPages());
});

gulp.task('npm-release', [ 'build', 'pages' ]);

function bundle(src, name, outDir, min) {
  process.env.NODE_ENV = min ? 'production' : 'development';
  var b = browserify({
    entries: src,
    debug: true,
    transform: [ babelify ],
  });
  return b.bundle()
    .pipe(source(name))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulpif(min, uglify({
          output: { ascii_only: true, max_line_len: 100000 }
        })))
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(outDir));
}
