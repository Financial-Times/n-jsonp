install:
	obt install --verbose

test:
	obt verify
	karma start tests/karma.conf.js

test-watch:
	obt verify
	karma start tests/karma.conf.js --no-single-run
