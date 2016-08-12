const gulp = require('gulp')
const gutil = require('gulp-util')
const pug = require('gulp-pug')
const file = require('gulp-file')
const ts = require('gulp-typescript')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackConfigDev = require('./config/webpack.config.dev')
const webpackConfigProd = require('./config/webpack.config.prod')
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
    .pipe(gulp.dest(BUILD_PATH))
})

gulp.task('assets', () => {
  return gulp.src('./assets/icons/**/*')
    .pipe(gulp.dest(`${BUILD_PATH}/assets/icons`))
})

gulp.task('webpack', cb => {
  webpack(webpackConfigProd, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString())
    cb()
  })
})

gulp.task('serve', () => {
  const compiler = webpack(webpackConfigDev)

  const server = new WebpackDevServer(compiler, {
    contentBase: BUILD_PATH,
    hot: true,
    stats: {
      colors: true
    }
  })

  server.listen(8080, 'localhost', err => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', 'http://localhost:8080')
  })
})

gulp.task('default', ['pug', 'assets', 'manifest', 'serve'])
