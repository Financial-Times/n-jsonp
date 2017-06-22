module.exports = function (config) {
	config.set({
		frameworks: ['mocha', 'chai'],
		files: ['**/*.spec.js'],
		preprocessors: {
			// add webpack as preprocessor
			'**/*.spec.js': ['webpack']
		},
		reporters: ['progress'],
		port: 9876, // karma web server port
		colors: true,
		logLevel: config.LOG_INFO,
		browsers: ['Firefox'],
		autoWatch: false,
		concurrency: Infinity
	});
};
