/* global describe, it */
import jsonpFetch from '../../client/main';

describe('JSONP Fetch', () => {

	it('should insert a script tag into the page', () => {
		jsonpFetch('http://other.domain.com/foo');
		// get the last script tag
		const scriptEls = document.querySelectorAll('script');
		scriptEls[scriptEls.length - 1].src.should.equal('http://other.domain.com/foo?callback=FT.jsonpCallback_1');
	});

	it('should handle urls with query strings', () => {
		jsonpFetch('http://other.domain.com/foo?query=blah');
		// get the last script tag
		const scriptEls = document.querySelectorAll('script');
		scriptEls[scriptEls.length - 1].src.should.equal(
			'http://other.domain.com/foo?query=blah&callback=FT.jsonpCallback_2'
		);
	});

	it('should return a promise with correct data', () => {
		return jsonpFetch('http://next-video.ft.com/api/4165329773001')
			.then(response => {
				response.ok.should.be.true;
				response.status.should.equal(200);

				return response.json()
					.then(json => json.should.have.property('id', 4165329773001));
			});
	});

	// NOTE - need to mock this somehow
	it.skip('should return correct error message', () => {
		return jsonpFetch('http://next-video.ft.com/api/bad-id', { timeout: 100 })
			.then(response => {
				response.ok.should.be.false;
				response.status.should.equal(400);
			});
	});

	it('should throw if script times out', () => {
		return jsonpFetch('http://next-video.ft.com/api/bad-id', { timeout: 0 })
			.should.be.rejectedWith('JSONP request to http://next-video.ft.com/api/bad-id timed out');
	});

});
