const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mockData = require('./api-mock-data/mock-data.json');

// Run headless Chrome instance
async function getRequest() {
  let options = new chrome.Options();
  options.addArguments('--incognito');
  options.addArguments('--headless');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  // Get API response from fakestoreapi.com
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://fakestoreapi.com/products')

  xhr.onload = function () {
    let API_response = JSON.parse(xhr.responseText);
    let API_id15 = API_response.find(item => item && item.id === 15);
    let mockData_id15 = mockData.find(item => item && item.id === 15);

    // Validate API response
    if (xhr.status == 200) {
      console.log('- Passed: 200 response from API')
    } else {
      console.log('- Failed: 200 response from API, instead got:', xhr.status)
    }

    // Validate number of IDs (Products)
    if (API_response) {
      let idCount = 0;
      idCount = API_response.filter(item => item).length;

      assert.equal(mockData.length, idCount);

      console.log('- Passed: Total number of IDs from API response');
    } else {
      console.log('- Failed: Total number of IDs from API response');
    }

    // Validate content of product ID 15
    if (API_response && Object.keys(API_id15).length == 7) {
      assert.equal(mockData_id15.id, API_id15.id);
      assert.equal(mockData_id15.title, API_id15.title);
      assert.equal(mockData_id15.price, API_id15.price);
      assert.equal(mockData_id15.category, API_id15.category);
      assert.equal(mockData_id15.description, API_id15.description);
      assert.equal(mockData_id15.image, API_id15.image);
      assert.equal(mockData_id15.rating.rate, API_id15.rating.rate);
      assert.equal(mockData_id15.rating.count, API_id15.rating.count);

      console.log('- Passed: Validate all items of product ID 15');
    } else {
      console.log('- Failed: Validate all items of product ID 15')
    }
  }

  xhr.send()

  await driver.quit();
}

getRequest();