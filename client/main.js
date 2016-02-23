const jsonpCallbackNames = [];

const generateCallbackName = () => {
	const base = 'jsonpCallback';
	const callbackName = `${base}_${jsonpCallbackNames.length + 1}`;
	jsonpCallbackNames.push(callbackName);
	return callbackName;
};

const crossDomainFetch = (...args) => {
	const crossDomainFetch = ('withCredentials' in new XMLHttpRequest()) ? fetch : jsonpFetch;
	return crossDomainFetch(...args);
};

const jsonpFetch = (url, opts) => {
	const defaultOpts = {
		timeout: 2000
	};
	opts = opts || {};
	Object.keys(defaultOpts).forEach(defaultOptsKey => {
		if (!opts.hasOwnProperty(defaultOptsKey)) {
			opts[defaultOptsKey] = defaultOpts[defaultOptsKey];
		}
	});
	return new Promise((resolve, reject) => {
		const callbackName = generateCallbackName();
		let timeout;
		window.FT = window.FT || {};
		window.FT[callbackName] = response => {
			const status = response.status ? response.status : 200;
			resolve({
				ok: Math.floor(status / 100) === 2,
				status: status,
				json: () => Promise.resolve(response.body || response)
			});
			if (timeout) {
				clearTimeout(timeout);
			}
		};

		const scriptTag = document.createElement('script');
		scriptTag.defer = true;
		scriptTag.src = `${url}${url.indexOf('?') > -1 ? '&' : '?'}callback=FT.${callbackName}`;
		document.body.appendChild(scriptTag);

		timeout = setTimeout(() => {
			reject(new Error(`JSONP request to ${url} timed out`));
		}, opts.timeout);
	});
};

export default jsonpFetch;
export { crossDomainFetch };
