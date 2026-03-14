const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mockData = require('./api-mock-data/mock-data.json');

describe('API functionality on fakestoreapi.com/products', function () {
  let driver;

  before(async function () {
    let options = new chrome.Options();
    options.addArguments("--incognito");
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

  it("should validate GET response and API functionality", async function () {
    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://fakestoreapi.com/products');

      xhr.onload = function () {
        try {
          // Setup data to be used
          const API_response = JSON.parse(xhr.responseText);
          const API_id15 = API_response.find(item => item && item.id === 15);
          const mockData_id15 = mockData.find(item => item && item.id === 15);

          // TEST 1: Validate GET Response
          assert.strictEqual(xhr.status, 200, `Expected status 200, got ${xhr.status}`);

          // TEST 2: Validate number of total ID's (Products) and compare with mock data
          const idCount = API_response.filter(item => item).length;
          assert.strictEqual(mockData.length, idCount, `Mismatch in product count: mockData(${mockData.length}) vs API(${idCount})`);

          // TEST 3: Validate items and content of product with ID 15 and compare with mock data
          assert.ok(API_id15 && mockData_id15, "Product with id 15 should exist in both API and mock data");
          assert.strictEqual(Object.keys(API_id15).length, 7, "API product with id 15 should have 7 properties");

          // TEST 4: Validate correct fields and data for ID 15
          const levelOneKeys = ['id', 'title', 'price', 'category', 'description', 'image'];
          for (const key of levelOneKeys) {
            assert.strictEqual(
              mockData_id15[key],
              API_id15[key],
              `Mismatch for property '${key}' for product id 15`
            );
          }

          const levelTwoKeys = ['rate', 'count'];
          for (const key of levelTwoKeys) {
            assert.strictEqual(
              mockData_id15.rating[key],
              API_id15.rating[key],
              `Mismatch for rating property '${key}' for product id 15`
            );
          }

          resolve();
        } catch (e) {
          reject(e);
        }
      };

      xhr.onerror = function () {
        reject(new Error('Network error during XHR'));
      };
      xhr.send();
    });
  });
});