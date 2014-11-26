var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

console.log(webpackConfig);

gulp.task("default", ["webpack-dev-server"]);

gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	console.log(myConfig.output.publicPath);

	var devCompiler = webpack(myConfig);

	// Start a webpack-dev-server
	var server = new WebpackDevServer(devCompiler, {
		// webpack-dev-server options
	   contentBase: __dirname + "/dist/",
	   // or: contentBase: "http://localhost/",

	   hot: false,
	   // Enable special support for Hot Module Replacement
	   // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
	   // Use "webpack/hot/dev-server" as additional module in your entry point

	   // webpack-dev-middleware options
	   /*quiet: false,
	   noInfo: false,
	   lazy: true,
	   watchDelay: 300, */
	   publicPath: "/scripts/",
	   /*headers: { "X-Custom-Header": "yes" },*/
	   stats: { colors: true }

	});

	server.app.get('/index.html', function(request, response) {
		response.sendfile('./dist/index.html');
	});

	server.listen(8080, "0.0.0.0", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});

});