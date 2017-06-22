node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

start-test-server:
	@echo "Starting test server…"
	node test/test-app.js &

stop-test-server:
	@echo "Stopping test server…"
	pkill -f 'node test/test-app.js'

unit-test-server:
	@echo "Unit testing server…"
	mocha --recursive --reporter spec test/server

unit-test-client: start-test-server
	@echo "Unit testing client…"
	karma start test/client/karma.conf.js
	$(MAKE) stop-test-server

unit-test-client-watch: start-test-server
	@echo "Watching client unit tests…"
	karma start test/client/karma.conf.js --no-single-run
	$(MAKE) stop-test-server

unit-test: unit-test-server unit-test-client

test: verify unit-test
