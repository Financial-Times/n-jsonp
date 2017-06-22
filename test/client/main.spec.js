import jsonpFetch from '../../client/main';

describe('JSONP Fetch', () => {

	it('should insert a script tag into the page', () => {
		jsonpFetch('http://other.domain.com/foo');
		// get the last script tag
		const scriptEls = document.querySelectorAll('script');
		scriptEls[scriptEls.length - 1].src.should.equal('http://other.domain.com/foo?callback=FT.nJsonpCallback_1');
	});

	it('should handle urls with query strings', () => {
		jsonpFetch('http://other.domain.com/foo?query=blah');
		// get the last script tag
		const scriptEls = document.querySelectorAll('script');
		scriptEls[scriptEls.length - 1].src.should.equal(
			'http://other.domain.com/foo?query=blah&callback=FT.nJsonpCallback_2'
		);
	});

	it('should return a promise with correct data', () => {
		return jsonpFetch('http://localhost:3001/good')
			.then(response => {
				response.ok.should.be.true;
				response.status.should.equal(200);

				return response.json()
					.then(json => {
						json.message.should.equal('hello world')
					});
			});
	});

	it('should return correct error message', () => {
		return jsonpFetch('http://localhost:3001/400', { timeout: 100 })
			.then(response => {
				response.ok.should.be.false;
				response.status.should.equal(400);

				return response.json()
					.then(json => {
						json.error.should.equal('your bad')
					});
			});
	});

	it('should throw if script times out', () => {
		return jsonpFetch('http://localhost:3001/good', { timeout: 0 })
			.should.be.rejectedWith('JSONP request to http://localhost:3001/good timed out');
	});

});
