# CI-JavaScript

## Project description

#### Assignment Part 2

Test login functionality for https://www.saucedemo.com

- Test 1: Validate successful login
- Test 2: Validate successful logout
- Test 3: Validate unsuccessful login

*File path: JavaScript/login-test.js*

#### Assignment Part 3

Test GET request and API response for https://fakestoreapi.com/products.

- Test 1: Validate GET Response status
- Test 2: Validate the number of total products and compare with the mock data and API response
- Test 3: Validate number of fields in ID 15 and compare with the mock data and API response
- Test 4: Validate specific field data (Title, Price and Category) from ID 15 and compare with the mock data and API response
- Test 5: Validate the whole object for ID 15 and compare with the mock data and API response

*File path: JavaScript/get-request-test.js*

## GitHub Actions

- Check the log of the latest push in the "JavaScript Build & Test" section: https://github.com/Grinspoon/CI-JavaScript/actions
- Part 2: All tests should pass
- Part 3: Test should fail with AssertionError [ERR_ASSERTION]: Expected status 200, instead got: 403

## How to install and run the project locally

1. Check your Chrome version and download corresponding chromedriver: https://googlechromelabs.github.io/chrome-for-testing/#stable
2. Add the chromedriver to your respective operating system
3. Install node.js: https://nodejs.org/en or with brew
4. Open the terminal and go to the root of the project
5. Install the package.json dependencies with the command: npm install
6. Go to the JavaScript folder
7. Run the tests with command and observe output:
    - npx mocha login-test.js
    - npx mocha get-request-test.js
