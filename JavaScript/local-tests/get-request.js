const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mockData = require('./api-mock-data/mock-data.json');

describe('API functionality on fakestoreapi.com/products', function () {
  let driver;

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