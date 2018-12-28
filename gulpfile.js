// 'use strict';
 
// var gulp = require('gulp');
// var sass = require('gulp-sass');
// var { series, parallel } = gulp;
 
// sass.compiler = require('node-sass');
 
// gulp.task('sass', function () {
//   return gulp.src('src/**/*.scss')
//     .pipe(sass({
//       includePaths: 'node_modules'
//     }).on('error', sass.logError))
//     .pipe(gulp.dest('assets'));
// });
 
// gulp.task('watch', function () {
//   gulp.watch('src/**/*.scss', series('sass'));
// });

// gulp.task('dev', series('sass', 'watch'));
// gulp.task('build', series('sass'));


// var browserify = require('browserify');
// var fs = require('fs');
// var babelify = require('babelify');
// var esmify = require('esmify');
// gulp.task('default', function () {
//   return browserify('assets/fuck.js')
//     .plugin(esmify)
//     .bundle()
//     .pipe(fs.createWriteStream('hehe.js'))
// })

// var esmify = require('esmify');
// browserify('src/fuck.ts')
// .transform(babelify.configure({
//   presets: ['@babel/preset-env'],
//   // plugins: ['transform-es2015-modules-commonjs']
// }))
// .plugin(tsify)
//   // .transform(babelify)
//   .bundle()
//   .pipe(fs.createWriteStream('hehe.js'))

// const rollup = require('rollup');
// const rollupTypescript = require('rollup-plugin-typescript');
// const nodeResolve = require('rollup-plugin-node-resolve');
// const commonjs = require('rollup-plugin-commonjs');

// gulp.task('build', async function () {
//   const bundle = await rollup.rollup({
//     input: './src/main.ts',
//     plugins: [
//       rollupTypescript(),
//       nodeResolve(),
//       commonjs()
//     ]
//   });

//   await bundle.write({
//     file: './dist/library.js',
//     format: 'umd',
//     name: 'library',
//     sourcemap: true
//   });
// });
