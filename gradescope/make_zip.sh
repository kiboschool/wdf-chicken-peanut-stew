#!/usr/bin/env bash

# copy test file
cp ../*.test.js ./
# copy package.json
cp ../package.json ../jest.config.js ./

zip -r gradescope.zip setup.sh run_autograder package.json jest.config.js *.test.js

# remove test file
rm ./*.test.js
rm package.json
rm jest.config.js
