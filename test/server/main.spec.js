import express from 'express';
import request from 'supertest';
import jsonpMiddleware from '../../server/main';

describe('Middelware', () => {

	let app;

	before(() => {
		app = express();
		app.use(jsonpMiddleware);
		app.get('/', (req, res) => {
			res.jsonp('a response');
		});
	});

	it('should return a 200 with a status in the response', () => {
		return request(app)
			.get('/?callback=foo')
			.expect(200, /"status":200/);
	});

	it('should return a body in the response', () => {
		return request(app)
			.get('/?callback=foo')
			.expect(/"body":"a response"/);
	});

	it('should return json if no callback', () => {
		return request(app)
			.get('/')
			.expect(200, '"a response"');
	});

});
