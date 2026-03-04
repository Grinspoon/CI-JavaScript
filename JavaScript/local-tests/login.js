const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

// Initialize options with incognito argument
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

  await driver.sleep(1000);

  // Setup credentials
  const credentials = [
    { username: 'visual_user', password: 'secret_sauce', type: 'passed' },
    { username: 'wrong_user', password: 'no_secret_sauce', type: 'failed' }
  ];

  // Automate successful login
  const userPassed = credentials.find(item => item.type === 'passed');

  usernameField = await driver.findElement({ xpath: '//*[@id="user-name"]' });
  await usernameField.sendKeys(userPassed.username);

  passwordField = await driver.findElement({ xpath: '//*[@id="password"]' });
  await passwordField.sendKeys(userPassed.password);

  let loginButton = await driver.findElement({ xpath: '//*[@id="login-button"]' });
  await loginButton.click();

  // Validate successful login
  const inventoryHeader = await driver.findElement({ xpath: '//*[@id="header_container"]/div[2]/span' });
  const inventoryHeaderText = await inventoryHeader.getText();

  assert.equal(inventoryHeaderText, 'Products');

  if (inventoryHeader) {
    console.log('- Login successful: Passed');
  } else {
    console.log('- Login successful: Failed');
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
  const userFailed = credentials.find(item => item.type === 'failed');

  usernameField = await driver.findElement({ xpath: '//*[@id="user-name"]' });
  await usernameField.sendKeys(userFailed.username);

  passwordField = await driver.findElement({ xpath: '//*[@id="password"]' });
  await passwordField.sendKeys(userFailed.username);

  loginButton = await driver.findElement({ xpath: '//*[@id="login-button"]' });
  await loginButton.click();

  // Validate failed login
  const errorMessage = await driver.findElement({ xpath: '//*[@data-test="error"]' });
  const errorMessageText = await errorMessage.getText();

  assert.equal(
    errorMessageText,
    'Epic sadface: Username and password do not match any user in this service'
  );

  if (inventoryHeader) {
    console.log('- Login unsuccessful: Passed');
  } else {
    console.log('- Login unsuccessful: Failed');
  }

  await driver.sleep(2000);

  await driver.quit();
}

login();