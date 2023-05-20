const fs = require('fs');

// jest custom reporter
// see: https://jestjs.io/docs/configuration#testresultsprocessor-string
// see: https://gradescope-autograders.readthedocs.io/en/latest/specs/#output-format
function gradingReporter(testResults) {
  const testSuites = testResults.testResults;
  const tests = testSuites.map(ts => ts.testResults).flat()
  const results = { 
    "output": `(${testResults.numPassedTests}/${testResults.numTotalTests} tests passed)`,
    "output_format": "simple_format",
    "test_output_format": "text",
    "test_name_format": "text", 
    "visibility": "visible",
    "stdout_visibility": "visible",
    "tests": tests.map(test => ({
      "name": test.title,
      "score": test.status == "passed" ? WEIGHTS[test.title] : 0,
      "max_score": WEIGHTS[test.title],
      "status": test.status, 
      "name_format": "text",
      "output": test.status == "passed" ? `**PASSED: ${test.title}**` : `**FAILED: ${test.title}**\n\n ${test.ancestorTitles.join('\n')} \n\n **Errors**: ${test.failureMessages.join('\n')}`,
      "output_format": "md",
      "visibility": "visible", 
    }))
  }

  // write out to the results.json file
  const outputFile = './results.json'
  const stringResults = JSON.stringify(results, null, 2)
  fs.writeFileSync(outputFile, stringResults)
  // return the unmodified test results
  return testResults;
}

module.exports = gradingReporter;

// track the weight for each test
const WEIGHTS = {};
WEIGHTS.__total = 0;

// add a test and points
const weight = (points, testname) => {
  if (testname in WEIGHTS) {
    throw new Error(`Grade-weighted tests require unique names. ${testname} has already been used`);
  }
  WEIGHTS[testname] = points
  WEIGHTS.__total += points
  return testname
}

module.exports.weight = weight
