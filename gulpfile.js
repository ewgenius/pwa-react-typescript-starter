const gulp = require('gulp')
const pug = require('gulp-pug')
const file = require('gulp-file')

const manifest = require('./config/manifest')

const BUILD_PATH = './build'
const SRC_PATH = './src'

gulp.task('pug', () => {
  return gulp.src(`${SRC_PATH}/index.pug`)
    .pipe(pug({
      locals: {
        title: manifest.name
      }
    }))
    .pipe(gulp.dest(BUILD_PATH))
})

gulp.task('manifest', () => {
  return file('manifest.json', JSON.stringify(manifest, null, 2))
    .pipe(gulp.dest('./build'))
})

gulp.task('assets', () => {
  return gulp.src('./assets/icons/**/*')
    .pipe(gulp.dest('./build/assets/icons'))
})
