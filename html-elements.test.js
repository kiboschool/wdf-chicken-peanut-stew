/* 
 * This file contains tests that check whether your solution in index.html is correct.
 * Run the tests with `npm run test`
 *
 * You can through this file to learn more about what is being tested, but do not modify it.
 *
 */

const fs = require('fs');
const path = require('path');
const { queries } = require('@testing-library/dom');
require("html-validate/jest");
const w = require('jest-autograding-reporter').weight

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

jest.dontMock('fs');

describe('The recipe page has the required HTML elements', () => {
  beforeAll(() => {
    document.documentElement.innerHTML = html.toString();
  });

  test(w(3, 'uses at least one heading element'), function () {
    queries.getAllByRole(document, 'heading')
  });

  test(w(2, 'uses at least three heading elements'), function () {
    let headings = queries.getAllByRole(document, 'heading')
    expect(headings.length).toBeGreaterThanOrEqual(3)
  });

  test(w(3, 'uses at least two list elements'), function () {
    let lists = queries.getAllByRole(document, 'list')
    expect(lists.length).toBeGreaterThanOrEqual(2)
  });

  test(w(1, 'uses at least one image element'), function () {
    queries.getAllByRole(document, 'img')
  });

  test(w(1, 'index.html is a valid html doc'), function () {
    expect(html).toHTMLValidate();
  })
})
