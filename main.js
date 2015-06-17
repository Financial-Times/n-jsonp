'use strict';

var jsonpCallbackNames = [];

function generateCallbackName() {
	var base = 'jsonpCallback';
	var callbackName = base + '_' + (jsonpCallbackNames.length + 1);
	jsonpCallbackNames.push(callbackName);
	return callbackName;
}

module.exports = function (url, opts) {
	var defaultOpts = {
		timeout: 2000
	};
	opts = opts || {};
	Object.keys(defaultOpts).forEach(function (defaultOptsKey) {
		if (!opts.hasOwnProperty(defaultOptsKey)) {
			opts[defaultOptsKey] = defaultOpts[defaultOptsKey];
		}
	});
	return new Promise(function (resolve, reject){
		var callbackName = generateCallbackName();
		var timeout;
		window.FT = window.FT || {};
		window.FT[callbackName] = function (response){
			resolve({
				ok: true,
				json: function () {
					return Promise.resolve(response);
				}
			});
			if (timeout){
				clearTimeout(timeout);
			}
		};

		var scriptTag = document.createElement('script');
		scriptTag.async = true;
		scriptTag.defer = true;
		scriptTag.src = url + '?callback=FT.' + callbackName;
		document.body.appendChild(scriptTag);

		timeout = setTimeout(function () {
			reject(new Error('JSONP request to ' + url + ' timed out'));
		}, opts.timeout);
	});

};
