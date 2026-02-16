const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

// Open Google Chrome
async function testLogin() {
    let options = new chrome.Options();
    options.addArguments('--incognito');
  
    let driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    // Navigate to saucedemo
    await driver.get('https://www.saucedemo.com');

    await driver.manage().window().maximize();

    await driver.sleep(2000);

    // Try successful login
    const usernameField = await driver.findElement({ xpath: '//*[@id="user-name"]' });
    await usernameField.sendKeys('visual_user');

    const passwordField = await driver.findElement({ xpath: '//*[@id="password"]' });
    await passwordField.sendKeys('secret_sauce');

    const loginButton = await driver.findElement({ xpath: '//*[@id="login-button"]'  });
    await loginButton.click();

    await driver.sleep(2000);

    // Verify successful login
    const inventoryHeader = await driver.findElement({ xpath: '//*[@id="header_container"]/div[2]/span' });
    const inventoryHeaderText = await inventoryHeader.getText();

    assert.equal(inventoryHeaderText, 'Products');

    if (inventoryHeader) {
        console.log('Login successful');
    }

    await driver.sleep(2000);

    await driver.quit();
}

testLogin();