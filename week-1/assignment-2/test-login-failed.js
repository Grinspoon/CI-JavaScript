const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

// Open Google Chrome
async function testLoginFailed() {
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
    await usernameField.sendKeys('wrong_user');

    const passwordField = await driver.findElement({ xpath: '//*[@id="password"]' });
    await passwordField.sendKeys('wrong_password');

    const loginButton = await driver.findElement({ xpath: '//*[@id="login-button"]'  });
    await loginButton.click();

    await driver.sleep(2000);

    // Verify successful login
    const inventoryHeader = await driver.findElement({ xpath: '//*[@id="login_button_container"]/div/form/div[3]' });
    const inventoryHeaderText = await inventoryHeader.getText();

    assert.equal(inventoryHeaderText, 'Epic sadface: Username and password do not match any user in this service');
    
    if (inventoryHeader) {
        console.log('Login failed - Wrong username or password');
    }

    await driver.sleep(2000);

    await driver.quit();
}

testLoginFailed();