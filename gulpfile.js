var gulp = require('gulp');
//引入js压缩合并 
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

//css压缩
var cssnano = require('gulp-cssnano');

//图片压缩 不需要网络
var imagemin = require('gulp-imagemin');
//图片压缩  需要网络
var smushit = require('gulp-smushit');

//html压缩
var htmlmin = require('gulp-htmlmin');

//浏览器同步操作
var browserSync = require('browser-sync');

//引入less编译模块
var less = require('gulp-less');

// gulp.task('default',function(){
// 	console.log('zxc');
// });

// 代码压缩
// gulp.task('jsUglify',function(){
// 	//读取要压缩的代码
// 	gulp.src('src/scripts/index.js')
// 	//压缩
// 	.pipe(uglify())
// 	//保存到哪个文件夹下
// 	.pipe(gulp.dest('dist/scripts'))
// });

gulp.task('script',function(){
	//读取要压缩的代码
	gulp.src('src/scripts/*.js')
	//合并
	 // .pipe(concat('all.js'))
	//压缩
	.pipe(uglify())
	//保存到哪个文件夹下
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('style',function(){
	gulp.src('src/styles/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('images',function(){
	gulp.src('src/images/*.{png,jpg,gif,jpeg}')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('image',function(){
	gulp.src('src/images/*.{png,jpg,gif,jpeg}')
	.pipe(smushit({verbose: true}))
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html',function(){
	var options = {
	    removeComments: true,//清除HTML注释
	    collapseWhitespace: true,//压缩HTML
	    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
	    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
	    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
	    minifyJS: true,//压缩页面JS
	    minifyCSS: true//压缩页面CSS
	}

    gulp.src('src/*.html')
	.pipe(htmlmin(options))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('servers',function(){
	browserSync({
		server:{
			baseDir: ['dist']
		}
	},function(err,bs){
		console.log(bs.options.getIn(['urls','local']));
	});
	 // 如果index.html 发生改变时，去执行html任务
    gulp.watch('./src/*.html',['html']);
    gulp.watch('./src/scripts/*.js',['script']);
    gulp.watch('./src/styles/*.less',['style']);
    gulp.watch('./src/images/*.{png,jpg,gif,jpeg}',['images']);

});

gulp.task('mainTask',['html','images','style','script','servers']);