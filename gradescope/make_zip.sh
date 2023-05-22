#!/usr/bin/env bash

# copy test file
cp ../*.test.js ./
# copy package.json
cp ../package.json ./
cp -r ../jest-autograding-reporter ./

zip -r gradescope.zip setup.sh run_autograder package.json *.test.js jest-autograding-reporter/*

# remove test file
rm ./*.test.js
rm package.json
rm -r jest-autograding-reporter
