var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");

var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

gulp.task("default", ["webpack-dev-server"]);

gulp.task("webpack-dev-server", function(callback) {

	var myDevConfig = Object.create(webpackConfig);
	myDevConfig.devtool = "eval";
	myDevConfig.debug = true;

	console.log(myDevConfig.output.publicPath);

	var devCompiler = webpack(myDevConfig);

	var server = new WebpackDevServer(devCompiler, {
		contentBase: __dirname + "/dist/",
		hot: false,
		publicPath: "/scripts/",
		stats: { colors: true }
	});

	server.app.get('/index.html', function(request, response) {
		response.sendfile('./dist/index.html');
	});

	server.listen(8080, "0.0.0.0", function(err) {

		if(err)
			throw new gutil.PluginError("webpack-dev-server", err);

		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

	});

});