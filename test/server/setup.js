require('babel-register')({
	// just transpile the tests
	only: filename => /n-jsonp\/test/.test(filename)
});
