.PHONY: test

install:
	npm install

verify:
	find ./client ./server ./test -type f | xargs lintspaces -e .editorconfig -i js-comments &&\
	eslint -c ./.eslintrc.json ./client ./server ./test

unit-test:
	mocha --require test/server/setup --recursive --reporter spec test/server &&\
	karma start test/client/karma.conf.js

unit-test-watch:
	karma start test/client/karma.conf.js --no-single-run

test: verify unit-test

build:
	babel --plugins transform-es2015-modules-commonjs -d ./build ./server
