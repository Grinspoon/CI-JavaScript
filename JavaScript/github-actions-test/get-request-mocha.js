const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

describe('GitHub Actions CI (JS)', function() {
    let driver;

    before(async function() {
        
        // Run headless Chrome instance
        const chrome = require('selenium-webdriver/chrome');
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });
    after(async function() {
        await driver.quit();
    });

    // Validate API response
    it('Response status validation', async function() {
    
        await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://fakestoreapi.com/products');
            xhr.onload = function () {
                try {
                    assert.strictEqual(xhr.status, 403, `Expected status 403, got ${xhr.status}`);
                    resolve();
                } catch (e) {
                    reject(e);
                }
            };

            xhr.send();
        });
    });
});