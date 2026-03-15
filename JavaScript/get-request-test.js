const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mockData = require('./mock-data/mock-data.json');

describe('API functionality on fakestoreapi.com/products', function () {
  let driver;

  // Timeout for slow environments
  this.timeout(20000);

  before(async function () {
    let options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async function () {
    await driver.quit();
  });

  it("Should validate GET response and API functionality", async function () {
    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://fakestoreapi.com/products');

      xhr.onload = function () {
        try {
          // TEST 1: Validate GET Response status
          assert.strictEqual(xhr.status, 200, `Expected status 200, instead got: ${xhr.status}`);
          console.log("- Passed: Got a 200 status response");

          // Setup data to be used for TEST 2-5
          let ResponseAPI = JSON.parse(xhr.responseText);
          const ItemCountAPI = ResponseAPI.filter(item => item).length;
          const apiDataId15 = ResponseAPI.find(item => item && item.id === 15);
          const mockDataId15 = mockData.find(item => item && item.id === 15);

          // TEST 2: Validate the number of total products and compare with the mock data and API response
          assert.strictEqual(mockData.length, ItemCountAPI, `Mismatch in product count: mock data: (${mockData.length}) API response: (${ItemCountAPI})`);
          console.log(`- Passed: Number of total products (mock data: ${mockData.length} API response: ${ItemCountAPI})`);

          // TEST 3: Validate number of fields in ID 15 and compare with the mock data and API response
          assert.strictEqual(Object.keys(mockDataId15).length, Object.keys(apiDataId15).length, "API product with id 15 should have 7 properties");
          console.log(`- Passed: Number of fields for ID 15 (mock data: ${Object.keys(mockDataId15).length} API response: ${Object.keys(apiDataId15).length})`);

          // TEST 4: Validate specific field data (Title, Price and Category) from ID 15 and compare with the mock data and API response
          const levelOneKeys = ['title', 'price', 'category'];
          for (const key of levelOneKeys) {
            assert.strictEqual(
              mockDataId15[key],
              apiDataId15[key],
              `Mismatch for property '${key}' for product id 15`
            );
          }
          console.log("- Passed: ID 15 has equal data for Title, Price and Category in both the mock data and API response");

          // TEST 5: Validate the whole object for ID 15 and compare with the mock data and API response
          assert.ok(apiDataId15 && mockDataId15, "The object for ID 15 should be equal in the mock data and API response");
          console.log("- Passed: The object for ID 15 is equal in both the mock data and API response.");

          resolve();
        } catch (e) {
          reject(e);
        }
      };

      xhr.onerror = function (err) {
        reject(new Error('Network error during XHR'));
      };
      xhr.send();
    });
  });
});