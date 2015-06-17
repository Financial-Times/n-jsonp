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

## Development

### Setup

Requires [origami build tools](github.com/Financial-Times/origami-build-tools)

    $ make install

### Testing

Requires Firefox

    $ make test
