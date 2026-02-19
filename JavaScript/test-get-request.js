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

  // Get API response
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://fakestoreapi.com/products')

  xhr.onload = function () {
    let API_response = JSON.parse(xhr.responseText);
    let API_id15 = API_response.find(item => item && item.id === 15);
    let mockData_id15 = mockData.find(item => item && item.id === 15);

    // Validate API response
    if (API_response.length !== undefined && xhr.status == 200) {
      console.log('- Passed: Got a 200 response from API')
    } else {
      console.log('- Failed: 200 response failed from the API, instead got:', xhr.status)
    }

    // Validate number of total ID's (Products) and compare with mock data
    if (API_response.length !== undefined) {
      let idCount = 0;
      idCount = API_response.filter(item => item).length;

      assert.equal(mockData.length, idCount);

      console.log(`- Passed: Number of ID's from API response, total ID's: ${mockData.length}/${idCount}`);
    } else {
      console.log(`- Failed: Number of ID's from API response`);
    }

    // Validate items and content of product with ID 15 and compare with mock data
    if (API_response.length !== undefined && Object.keys(API_id15).length == 7) {

      // First level array validation
      const levelOneKeys = ['id', 'title', 'price', 'category', 'description', 'image'];
      for (const key of levelOneKeys) {
        assert.equal(mockData_id15[key], API_id15[key]);
      }
      // Second level array validation
      const levelTwoKeys = ['rate', 'count'];
      for (const key of levelTwoKeys) {
        assert.equal(
          mockData_id15.rating[key],
          API_id15.rating[key]
        );
      }

      console.log('- Passed: Validated all items and content of product with ID 15, total items:', Object.keys(API_id15).length);
    } else {
      console.log('- Failed: Validate all items and content of product with ID 15');
    }
  }

  xhr.send()

  await driver.quit();
}

getRequest();