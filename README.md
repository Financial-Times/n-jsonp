# Next JSONP Fetch

Emulate fetch's interface, but use jsonp under the hood

## Usage

    var jsonpFetch = require('next-jsonp-fetch');
    var opts = {
        timeout: 1000
    };
    jsonpFetch('http://other.domain.com/foo', opts)
        .then(function (data) {
            ...
        });

Where `opts` has the defaults

    {
        timeout: 2000
    }
