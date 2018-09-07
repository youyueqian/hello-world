var gulp = require("gulp");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var browserSync = require("browser-sync");
// 处理less转换压缩css任务
gulp.task("style",function(){
	gulp.src(["src/styles/*.less","!src/styles/_*.less"])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest("dist/styles/"))
		.pipe(browserSync.reload({
			stream: true
		}));
});
// 处理图片移动的任务
gulp.task("image",function(){
	gulp.src("src/images/*.*")
		.pipe(gulp.dest("dist/images/"));
});
// 处理js压缩混淆
gulp.task("script",function(){
	gulp.src("src/scripts/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/scripts/"))
		.pipe(browserSync.reload({
			stream: true
		}));
});
// 处理html压缩
gulp.task("html",function(){
	gulp.src("src/*.html")
		.pipe(htmlmin({
			removeComments: true,//清除HTML注释
	        collapseWhitespace: true,//压缩HTML
	        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
	        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
	        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
	        minifyJS: true,//压缩页面JS
	        minifyCSS: true//压缩页面CSS
		}))
		.pipe(gulp.dest("dist/"))
		.pipe(browserSync.reload({
			stream: true
		}));
});
// 开启一个http服务并监视文件变化
gulp.task("serve",function(){
	browserSync({
		server:{
			baseDir:"dist/"
		}
	},function(err,bs){

	});
	gulp.watch("src/styles/*.less",["style"]);
	gulp.watch("src/images/*.*",["image"]);
	gulp.watch("src/scripts/*.js",["script"]);
	gulp.watch("src/*.html",["html"]);
	console.log("自动化服务已经开启...");
});