const fs = require('fs');
const path = require('path');

// track the weight for each test

// annoyingly, afaict there is no 'normal' way to keep data while jest tests are running
// that reporters can access
// so...we're just writing the weights to a file.
const WEIGHT_FILE = '__tmp-weights.json'
// clear

try {
  // write an empty object to guarantee the file exists
  fs.writeFileSync(WEIGHT_FILE, "{}", { flag: 'wx' })
} catch (err) {
  if (err.code == 'EEXIST') {
    // ignore
  } else {
    throw err
  }
}

function getWeight(name) {
  return JSON.parse(fs.readFileSync(WEIGHT_FILE))[name]
}

function totalWeight() {
  let mapping = JSON.parse(fs.readFileSync(WEIGHT_FILE))
  let total = 0;
  for (let k in mapping) {
    total += mapping[k]
  }
  return total
}

function setWeight(name, points) {
  let weights = JSON.parse(fs.readFileSync(WEIGHT_FILE))
  weights[name] = points
  fs.writeFileSync(WEIGHT_FILE, JSON.stringify(weights))
}

// add a test and points
const weight = (points, testname) => {
  if (getWeight(testname)) {
    throw new Error(`Grade-weighted tests require unique names. "${testname}" has already been used`);
  }
  setWeight(testname, points)
  return testname
}

// jest custom reporter
// see: https://jestjs.io/docs/configuration#testresultsprocessor-string
// see: https://gradescope-autograders.readthedocs.io/en/latest/specs/#output-format
function gradingReporter(testResults) {
  const testSuites = testResults.testResults;
  const weights = JSON.parse(fs.readFileSync(WEIGHT_FILE))
  const weightedTests = testSuites.map(ts => ts.testResults).flat().filter(t => t.title in weights)
  const results = { 
    "output": `(${testResults.numPassedTests}/${testResults.numTotalTests} tests passed)`,
    "output_format": "simple_format",
    "test_output_format": "text",
    "test_name_format": "text", 
    "visibility": "visible",
    "stdout_visibility": "visible",
    "tests": weightedTests.map(test => ({
      "name": test.title,
      "score": test.status == "passed" ? weights[test.title] : 0,
      "max_score": weights[test.title],
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
  // remove the tmp weights file
  fs.unlink(WEIGHT_FILE, (err) => {
    if (err) throw err;
  })
  // return the unmodified test results
  return testResults;
}

module.exports = gradingReporter;
module.exports.weight = weight
