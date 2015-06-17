/* global describe, it */
'use strict';

var nJsonpFetch = require('../main');

// NOTE: uses http://jsonplaceholder.typicode.com/, not sure how to genuinely mock jsonp...
describe('JSONP Fetch', function () {

	it('should insert a script tag into the page', function (){
		nJsonpFetch('http://other.domain.com/foo');
		// get the last script tag
		var scriptEls = document.querySelectorAll('script');
		scriptEls[scriptEls.length - 1].src.should.equal('http://other.domain.com/foo?callback=FT.jsonpCallback_1');
	});

	it('should handle urls with query strings', function (){
		nJsonpFetch('http://other.domain.com/foo?query=blah');
		// get the last script tag
		var scriptEls = document.querySelectorAll('script');
		scriptEls[scriptEls.length - 1].src.should.equal('http://other.domain.com/foo?query=blah&callback=FT.jsonpCallback_2');
	});

	it('should return a promise with correct data', function () {
		return nJsonpFetch('http://next-video.ft.com/api/4165329773001')
			.then(function (response) {
				response.ok.should.be.true;
				return response.json()
					.then(function (json) {
						json.should.have.property('id', 4165329773001);
					});
			});
	});

	it('should throw correct error message', function () {
		return nJsonpFetch('http://next-video.ft.com/api/bad-id', { timeout: 100 })
			.should.be.rejectedWith('JSONP request to http://next-video.ft.com/api/bad-id timed out');
	});

});
