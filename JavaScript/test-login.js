const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

// Open Google Chrome
async function login() {
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

  // Set credentials
  let credentials_passed = [
    { username_passed: 'visual_user', password_passed: 'secret_sauce' }
  ];

  let credentials_failed = [
    { username_failed: 'no_login', password_failed: 'no_login' }
  ];

  // Automate successful login
  for (const selected of credentials_passed) {
    let usernameField = await driver.findElement({ xpath: '//*[@id="user-name"]' });
    await usernameField.sendKeys(selected.username_passed);

    let passwordField = await driver.findElement({ xpath: '//*[@id="password"]' });
    await passwordField.sendKeys(selected.password_passed);

    let loginButton = await driver.findElement({ xpath: '//*[@id="login-button"]' });
    await loginButton.click();
  }

  // Validate successful login
  const inventoryHeader = await driver.findElement({ xpath: '//*[@id="header_container"]/div[2]/span' });
  const inventoryHeaderText = await inventoryHeader.getText();

  assert.equal(inventoryHeaderText, 'Products');

  if (inventoryHeader) {
    console.log('- Passed: Login');
  }

  await driver.sleep(2000);

  // Automate logout
  const menuButton = await driver.findElement({ xpath: '//*[@id="react-burger-menu-btn"]' })
  await menuButton.click();

  await driver.sleep(2000);

  const logoutButton = await driver.findElement({ xpath: '//*[@id="logout_sidebar_link"]' })
  await logoutButton.click();

  await driver.sleep(2000);

  // Automate failed login
  for (const selected of credentials_failed) {
    usernameField = await driver.findElement({ xpath: '//*[@id="user-name"]' });
    await usernameField.sendKeys(selected.username_failed);

    passwordField = await driver.findElement({ xpath: '//*[@id="password"]' });
    await passwordField.sendKeys(selected.username_failed);

    loginButton = await driver.findElement({ xpath: '//*[@id="login-button"]' });
    await loginButton.click();

    // Validate failed login
    if (inventoryHeader) {
      console.log('- Failed: Login');
    }
  }

  await driver.sleep(2000);

  await driver.quit();
}

login();