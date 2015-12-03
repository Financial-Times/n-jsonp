install:
	obt install --verbose

verify:
	obt verify

unit-test:
	karma start tests/karma.conf.js

unit-test-watch:
	karma start tests/karma.conf.js --no-single-run

test: verify unit-test

