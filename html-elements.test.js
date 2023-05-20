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

jest.dontMock('fs');

describe('The recipe page has the required HTML elements', () => {
  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
    document.documentElement.innerHTML = html.toString();
  });

  test('uses at least one heading element', function () {
    queries.getAllByRole(document, 'heading')
  });

  test('uses at least three heading elements', function () {
    let headings = queries.getAllByRole(document, 'heading')
    expect(headings.length).toBeGreaterThanOrEqual(3)
  });

  test('uses at least two heading elements', function () {
    let lists = queries.getAllByRole(document, 'list')
    expect(lists.length).toBeGreaterThanOrEqual(2)
  });

  test('uses at least one image element', function () {
    queries.getAllByRole(document, 'img')
  });
})
