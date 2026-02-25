const gulp = require("gulp");
const watch = require("gulp-watch");
const prefixer = require("gulp-autoprefixer");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const rimraf = require("gulp-rimraf");

const path = {
    src: {
        scss: "scss/",
        js: "js/",
        npm: "node_modules/",
    },
    dest: {
        css: "../modx/assets/",
        js: "../modx/assets/js/",
    },
    watch: {
        scss: "scss/",
        js: "js/",
    },
};

/*----------  SCSS  ----------*/

function buildStyles() {
    return (
        gulp
            .src(path.src.scss + "app.scss")
            // .pipe(sass({
            //   silenceDeprecations: ['import']
            // }).on('error', sass.logError))
            .pipe(sourcemaps.init())
            .pipe(sass().on("error", sass.logError))
            // .pipe(
            //     prefixer({
            //         overrideBrowserslist: ["last 4 versions"],
            //         cascade: false,
            //     })
            // )
            .pipe(
                cleanCSS({
                    compatibility: "ie8",
                }),
            )
            .pipe(
                sourcemaps.write(".", {
                    addComment: true,
                    mapFile: function (mapFilePath) {
                        return mapFilePath.replace(".scss", ".map");
                    },
                }),
            )
            .pipe(gulp.dest(path.dest.css))
    );
}

function ajaxformScss() {
    return gulp
        .src(path.src.scss + "ajaxform.scss")
        .pipe(sass())
        .pipe(
            prefixer({
                overrideBrowserslist: ["last 2 versions"],
                cascade: false,
            }),
        )
        .pipe(
            cleanCSS({
                compatibility: "ie8",
            }),
        )
        .pipe(gulp.dest(path.dest.css));
}

function loginScss() {
    return gulp
        .src(path.src.scss + "login.scss")
        .pipe(sass())
        .pipe(
            prefixer({
                overrideBrowserslist: ["last 2 versions"],
                cascade: false,
            }),
        )
        .pipe(
            cleanCSS({
                compatibility: "ie8",
            }),
        )
        .pipe(
            rename({
                suffix: "-min",
            }),
        )
        .pipe(gulp.dest(path.dest.login));
}

/*----------  JS  ----------*/

function mainJs() {
    return gulp
        .src([
            path.src.npm + "tiny-slider/dist/" + "tiny-slider.js",
            path.src.npm + "bxslider/dist/" + "jquery.bxslider.js",
            path.src.js + "CalendarSearch.js",
            path.src.js + "Modal.js",
            path.src.js + "main.js",
        ])
        .pipe(concat("main.js"))
        .pipe(terser())
        .pipe(rename({ suffix: "-min" }))
        .pipe(gulp.dest(path.dest.js));
}

function navJs() {
    return gulp
        .src([
            path.src.js + "blind.js",
            path.src.js + "nav.js",
            path.src.js + "sharing.js",
        ])
        .pipe(concat("nav.js"))
        .pipe(terser())
        .pipe(rename({ suffix: "-min" }))
        .pipe(gulp.dest(path.dest.js));
}

function pageJs() {
    return gulp
        .src([
            path.src.npm + "magnific-popup/dist/" + "jquery.magnific-popup.js",
            path.src.js + "page.js",
        ])
        .pipe(concat("page.js"))
        .pipe(terser())
        .pipe(rename({ suffix: "-min" }))
        .pipe(gulp.dest(path.dest.js));
}

function threeJs() {
    return gulp
        .src([
            path.src.npm + "three/build/" + "three.js",
            path.src.js + "GLTFLoader.js",
            path.src.js + "OrbitControls.js",
            path.src.js + "threeVendor.js",
        ])
        .pipe(concat("threeVendor.js"))
        .pipe(terser())
        .pipe(rename({ suffix: "-min" }))
        .pipe(gulp.dest(path.dest.js));
}

function threeSceneJs() {
    return gulp
        .src([path.src.js + "threeScene.js"])
        .pipe(concat("threeScene.js"))
        .pipe(terser())
        .pipe(rename({ suffix: "-min" }))
        .pipe(gulp.dest(path.dest.js));
}

function davWingsJs() {
    return gulp
        .src([path.src.js + "3d_davWings.js"])
        .pipe(concat("3d_davWings.js"))
        .pipe(terser())
        .pipe(rename({ suffix: "-min" }))
        .pipe(gulp.dest(path.dest.js));
}

function vendorJs() {
    return gulp
        .src([
            path.src.npm + "gsap/dist/" + "gsap.js",
            path.src.npm + "gsap/dist/" + "ScrollToPlugin.js",
            path.src.npm + "gsap/dist/" + "ScrollTrigger.js",
            path.src.npm + "imagesloaded/" + "imagesloaded.pkgd.js",
            // path.src.js + "gridder.js",
            // path.src.npm + "jscrollpane/script/" + "jquery.jscrollpane.js",
            // path.src.npm + "jscrollpane/script/" + "jquery.mousewheel.js",
            path.src.js + "vendor.js",
        ])
        .pipe(concat("vendor.js"))
        .pipe(terser())
        .pipe(rename({ suffix: "-min" }))
        .pipe(gulp.dest(path.dest.js));
}

function preloaderJs() {
    return gulp
        .src([path.src.js + "preloader.js"])
        .pipe(concat("preloader.js"))
        .pipe(terser())
        .pipe(rename({ suffix: "-min" }))
        .pipe(gulp.dest(path.dest.js));
}

/*----------  Recources  ----------*/

function cleanResourcesCache() {
    return gulp
        .src(path.dest.resources + "*", { read: false })
        .pipe(rimraf({ force: true }));
}

/*----------  Watch  ----------*/

function watchFiles() {
    gulp.watch(path.watch.scss + "*.scss", buildStyles);
    // gulp.watch(path.watch.scss + "ajaxform.scss", ajaxformScss);
    // gulp.watch(path.watch.scss + "login.scss", loginScss);
    gulp.watch(
        [
            path.watch.js + "main.js",
            path.watch.js + "pagephotoswipe.js",
            path.src.js + "CalendarSearch.js",
            path.src.js + "Modal.js",
        ],
        mainJs,
    );
    gulp.watch(
        [
            path.watch.js + "blind.js",
            path.watch.js + "nav.js",
            path.watch.js + "sharing.js",
        ],
        navJs,
    );
    gulp.watch(path.watch.js + "page.js", gulp.series(pageJs));
    gulp.watch(path.watch.js + "preloader.js", gulp.series(preloaderJs));
    gulp.watch(path.watch.js + "vendor.js", gulp.series(vendorJs));

    //   gulp.watch(path.watch.js + 'threeVendor.js', gulp.series('three-js'));
    //   gulp.watch(path.watch.js + 'threeScene.js', gulp.series('threeScene-js'));
    //   gulp.watch(path.watch.js + '3d_davWings.js', gulp.series('3d_davWings-js'));

    //   gulp.watch(path.watch.js + 'anniversary2025.js', gulp.series('anniversary-js'));
    //   gulp.watch(path.watch.chunks, gulp.series('clean-resources-cache'));
    //   gulp.watch(path.watch.templates, gulp.series('clean-resources-cache'));
}

// exports.buildStyles = buildStyles;
// exports.ajaxformScss = ajaxformScss;
// exports.loginScss = loginScss;
// exports.mainJs = mainJs;
// exports.navJs = navJs;
// exports.cleanResourcesCache = cleanResourcesCache;
exports.watch = watchFiles;

// Для дефолтной задачи:
exports.default = gulp.series(
    buildStyles,
    ajaxformScss,
    loginScss,
    mainJs,
    navJs,
    watchFiles,
);
