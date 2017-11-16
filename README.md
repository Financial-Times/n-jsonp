# Next JSONP

Contains both a client (bower) and server (npm) module

### Client

Emulate [fetch's](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) interface, but use JSONP under the hood

#### Install

	bower install -S n-jsonp

#### Usage

	import jsonpFetch from 'n-jsonp';

	const opts = {
		timeout: 1000
	};
	jsonpFetch('http://other.domain.com/foo', opts)
		.then(data => {
			...
		});

Where `opts` can take

* `{number} [timeout=2000]`

### Server

Express middleware, to work with the client module

#### Install

	npm install -S @financial-times/n-jsonp

#### Usage

	const app = require('express');
	const jsonpFetch = require('@financial-times/n-jsonp').default

	app = express();
	app.use(jsonpMiddleware);

	app.get('/', (req, res) => {
		res.jsonp('a response');
	});

	app.get('/error', (req, res) => {
		res.status(500)
			.jsonp('uh-oh');
	});

## Development

### Setup

Requires

	$ make install

### Testing

Requires Firefox

	$ make test
