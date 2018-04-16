var gulp = require('gulp');
var htmlClean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var less = require('gulp-less');
var postCss = require('gulp-postcss');
var prefix = require('autoprefixer');
var cssnano = require('cssnano');
var connect = require('gulp-connect');

var isDev = "development" == process.env.NODE_ENV;
console.log("--------------------------------->> " + isDev);
console.log("--------------ENV---------------->> " + process.env.NODE_ENV);

// gulp.src()    // 读文件
// gulp.dest()   // 写文件
// gulp.task()   // 任务
// gulp.watch()  // 监听

var folder = {
  src: "src/",    // 开发目录
  dist: "dist/"   // 打包后目录
}

gulp.task("html", function () {
  var page = gulp.src(folder.src + "html/*")
    .pipe(connect.reload())
  if (!isDev) {
    page.pipe(htmlClean())
  }
  page.pipe(gulp.dest(folder.dist + "html/"))
});

gulp.task("images", function () {
  gulp.src(folder.src + "images/*")
    .pipe(imageMin())
    .pipe(gulp.dest(folder.dist + "images/"))
});

gulp.task("css", function () {
  var options = [prefix(), cssnano()];
  var page = gulp.src(folder.src + "css/*")
    .pipe(connect.reload())
    .pipe(less())
  if (!isDev) {
    page.pipe(postCss(options))
  }
  page.pipe(gulp.dest(folder.dist + "css/"))
});

gulp.task("js", function () {
  var page = gulp.src(folder.src + "js/*")
    .pipe(connect.reload())
  if (!isDev) {
    page.pipe(stripDebug())
      // .pipe(concat("main.js"))
      .pipe(uglify())
  }
  page.pipe(gulp.dest(folder.dist + "js/"))
});

gulp.task("watch", function () {
  gulp.watch(folder.src + "html/*", ["html"]);
  gulp.watch(folder.src + "css/*", ["css"]);
  gulp.watch(folder.src + "js/*", ["js"]);
  gulp.watch(folder.src + "images/*", ["images"]);
});

gulp.task("server", function () {
  connect.server({
    port: "8090",
    livereload: true
  });
});

gulp.task('default', [
  "html",
  "css",
  "images",
  "js",
  "watch",
  "server"
], function () {
  // 将你的默认的任务代码放在这
});