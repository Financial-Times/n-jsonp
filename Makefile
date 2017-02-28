include n.Makefile

build: $(shell find server -type f)
	@echo "Building…"
	@rm -rf dist
	@babel -d dist/server server

unit-test-server: build
	@echo "Unit Testing Server…"
	@mocha --require test/server/setup --recursive --reporter spec test/server

unit-test-client:
	@echo "Unit Testing Client…"
	@karma start test/client/karma.conf.js

unit-test-client-watch:
	@echo "Watching Client Unit Tests…"
	@karma start test/client/karma.conf.js --no-single-run

unit-test: unit-test-server unit-test-client

test: verify unit-test
