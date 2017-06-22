module.exports = function (config) {
	config.set({
		frameworks: ['mocha', 'chai-as-promised', 'chai'],
		files: ['**/*.spec.js'],
		preprocessors: {
			// add webpack as preprocessor
			'**/*.spec.js': ['webpack']
		},
		reporters: ['progress'],
		port: 9876, // karma web server port
		colors: true,
		logLevel: config.LOG_INFO,
		browsers: ['ChromeHeadless'],
		autoWatch: false,
		singleRun: true,
		concurrency: Infinity
	});
};
