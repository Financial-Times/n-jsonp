export default (req, res, next) => {
	const existingJsonp = res.jsonp;
	const newJsonp = body => {
		// if it's jsonp...
		const callbackName = res.app.get('jsonp callback name');
		if (req.query[callbackName]) {
			const status = res.statusCode;
			res.status(200);
			body = {
				status,
				body
			};
		}
		existingJsonp.call(res, body);
	};

	res.jsonp = newJsonp;
	next();
};
