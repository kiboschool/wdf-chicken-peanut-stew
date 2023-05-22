module.exports = {
  // Stop running tests after `1` failure
  bail: 1,
  testEnvironment: "jsdom",
  globalTeardown: "jest-autograding-reporter/teardown.js",

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
};
