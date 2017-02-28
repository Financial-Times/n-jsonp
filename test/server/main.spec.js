import express from 'express';
import request from 'supertest';
import jsonpMiddleware from '../../dist/server/main';

describe('Middelware', () => {

	let app;

	before(() => {
		app = express();
		app.use(jsonpMiddleware);
		app.get('/good', (req, res) => {
			res.jsonp('a response');
		});
		app.get('/bad', (req, res) => {
			res.status(404).jsonp('a response');
		});
	});

	it('should return a 200 with a status in the response', () => {
		return request(app)
			.get('/good?callback=foo')
			.expect(200, /"status":200/);
	});

	it('should return a 200 with the set status code in the reponse', () => {
		return request(app)
			.get('/bad?callback=foo')
			.expect(200, /"status":404/);
	});

	it('should return a body in the response', () => {
		return request(app)
			.get('/good?callback=foo')
			.expect(/"body":"a response"/);
	});

	it('should return json if no callback', () => {
		return request(app)
			.get('/good')
			.expect(200, '"a response"');
	});

	it('should return set status code', () => {
		return request(app)
			.get('/bad')
			.expect(404);
	});

});
