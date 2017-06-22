const express = require('express');
const jsonpMiddleware = require('../server/main');

const app = express();
app.use(jsonpMiddleware);

app.get('/good', (req, res) => {
	res.status(200)
		res.jsonp({ message: 'hello world' });
});

app.get('/500', (req, res) => {
	res.status(500)
		res.jsonp({ error: 'my bad' });
});

app.get('/400', (req, res) => {
	res.status(400)
		res.jsonp({ error: 'your bad' });
});


app.listen(3001);
