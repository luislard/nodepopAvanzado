/* gulpfile.js */
var gulp = require('gulp');
var notify = require("gulp-notify");
var browserify = require("browserify");
var browserSync = require("browser-sync").create();
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var tap = require("gulp-tap");
var buffer = require("gulp-buffer");

// sass
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");

// source and distribution folder
var
    source = 'lib/',
    dest = 'public/';

// Our js source folder: .js files
var js = {
    in: source + 'js/*.js',
    out: dest + 'javascripts/'
};
// Our images source folder: .images files
var images = {
    in: source + 'img/*.*',
    out: dest + 'images/'
};


// default task
gulp.task('default', ["img", "sass", "js"], function () {
    // iniciamos el servidor de desarrollo
    browserSync.init({ 
        // server: "dist/"
        proxy: "http://localhost:3000/"

    });
    
    // observa cambios en los archivos SASS, y entonces ejecuta la tarea 'sass'
    gulp.watch(["lib/scss/*.scss", "lib/scss/**/*.scss"], ["sass"]);

    // observa cambios en los archivos JS y entonces ejecuta la tarea 'js'
    gulp.watch(["lib/js/*.js"], ["js"]);
});


// compilar sass
gulp.task("sass", function(){
    gulp.src("lib/scss/**/*.scss") // cargamos el archivo style.scss
        .pipe(sourcemaps.init()) // comienza a capturar los sourcemaps
        .pipe(sass().on("error", function(error){ // lo compilamos con gulp-sass
            return notify().write(error); // si ocurre un error, mostramos una notificación
        }))
        .pipe(postcss([
            autoprefixer(), // transforma el CSS dándole compatibilidad a versiones antiguas
            cssnano()       // comprime/minifca el CSS
        ]))
        .pipe(sourcemaps.write("./")) // guarda el sourcemap en la misma carpeta que el CSS
        .pipe(gulp.dest("public/css/")) // guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()) // recargue el CSS del navegador
        .pipe(notify("SASS Compilado 🤘🏻")) // muestra notifiación en pantalla
});

gulp.task("js",function(){
    gulp.src([
              js.in
            ])
        .pipe(tap(function(file){ // tap nos permite ejecutar una función por cada fichero seleccionado en gulp.src
            // reemplazamos el contenido del fichero por lo que nos devuelve browserify pasándole el fichero
            file.contents = browserify(file.path, {debug: true}) // creamos una instancia de browserify en base al archivo
                            .transform("babelify", {presets: ["es2015"]}) // traduce nuestro codigo de ES6 -> ES5
                            .bundle() // compilamos el archivo
                            .on("error", function(error){ // en caso de error, mostramos una notificación
                                return notify().write(error);
                            });
        }))
        .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
        .pipe(sourcemaps.init({loadMaps: true})) // captura los sourcemaps del archivo fuente
        .pipe(uglify()) // minificamos el JavaScript
        .pipe(sourcemaps.write('./')) // guarda los sourcemaps en el mismo directorio que el archivo fuente
        .pipe(gulp.dest(js.out)) // lo guardamos en la carpeta dist
        .pipe(browserSync.stream()) // recargamos el navegador
        .pipe(notify("JS Compilado"));
});

// tarea que optimiza y crea las imágenes responsive
gulp.task("img", function(){
    gulp.src(images.in)
        // .pipe(responsive({ // generamos las versiones responsive
        //     '*': [
        //         { width: 150, rename: { suffix: "-150px"}},
        //         { width: 250, rename: { suffix: "-250px"}},
        //         { width: 300, rename: { suffix: "-300px"}}
        //     ]
        // }))
        .pipe(imagemin()) // optimizamos el peso de las imágenes
        .pipe(gulp.dest(images.out))
});