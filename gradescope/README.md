# Gradescope config

Gradescope Docs: https://gradescope-autograders.readthedocs.io/

Autograding output for javascript projects is a bit tricky, since it uses a custom reporter instead of a gradescope-maintained library. Still... not that complicated, in the end.

## Writing tests for Gradescope

0. Write a solution (on the `solution` branch)
1. Write jest tests that the solution passes
2. Import the [custom reporter](https://github.com/kiboschool/jest-autograding-reporter) and add weights to the tests

```js
const w = require('jest-autograding-reporter').weight

// this test counts for 3 points
test(w(3, 'sums to eleven'), function () {
  expect(1 + 2 + 4 + 4).toEqual(11)
})
```

3. Double-check that the tests still pass, and that the tests don't specify anything that isn't in the instructions in the student-facing README. Add a note about testing to the README.
4. Copy your tests and any setup from the solution branch to the `main` branch. `git switch main; git checkout solution *.test.js jest.config.js package.json package-lock.json`. Check that your tests fail properly with the starter code.

Note: jest and the custom reporter need some config. A good starting point is to just copy package.json and jest.config.js from a working repo and then modify it if needed.

## Autograder config steps

1. Be sure that project dependencies are added to `package.json`
2. `cd gradescope; ./make_zip.sh; cd ..`
3. Upload `gradescope.zip` to the autograder, and check that it builds correctly
4. Zip and upload the solution (`zip -r solution.zip ./*`) as a submission for a test student, to check that everything is working as expected. You can use the 'Test Autograder' button or click through to Manage Submissions -> Upload Submission.
5. Check that the Autograder Points for the assignment are the same as the total points of the weights in the tests.

Don't commit the zip files, you can just remove them.

## What will Gradescope do?

- when you upload gradescope.zip, it will unzip and run `setup.sh`
- when a student makes an upload, it will run `run_autograder`
- That runs `run_tests.py`, which finds and runs the tests and formats the output for Gradescope
- Gradescope uses that output as the scoring for the submission
