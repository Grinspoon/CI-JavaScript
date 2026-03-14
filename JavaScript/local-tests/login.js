const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('Login functionality on saucedemo.com', function () {
  let driver;

  // Timeout for slow environments
  this.timeout(20000);

  before(async function () {
    // Run headless instance
    let options = new chrome.Options();
    options.addArguments("--incognito");
    options.addArguments("--headless");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    await driver.get('https://www.saucedemo.com');
  });

  after(async function () {
    await driver.quit();
  });

  // Setup user credentials
  const credentials = [
    { username: 'visual_user', password: 'secret_sauce', type: 'passed' },
    { username: 'wrong_user', password: 'no_secret_sauce', type: 'failed' }
  ];

  it('should login successfully with correct credentials', async function () {
    const userPassed = credentials.find(item => item.type === 'passed');

    let usernameField = await driver.findElement({ xpath: '//*[@id="user-name"]' });
    await usernameField.sendKeys(userPassed.username);
    let passwordField = await driver.findElement({ xpath: '//*[@id="password"]' });
    await passwordField.sendKeys(userPassed.password);
    let loginButton = await driver.findElement({ xpath: '//*[@id="login-button"]' });
    await loginButton.click();

    // Validate successful login
    const inventoryHeader = await driver.findElement({ xpath: '//*[@id="header_container"]/div[2]/span' });
    const inventoryHeaderText = await inventoryHeader.getText();
    assert.strictEqual(inventoryHeaderText, 'Products');
  });

  it('should logout successfully', async function () {
    const menuButton = await driver.findElement({ xpath: '//*[@id="react-burger-menu-btn"]' });
    await menuButton.click();
    await driver.sleep(1000);
    const logoutButton = await driver.findElement({ xpath: '//*[@id="logout_sidebar_link"]' });
    await logoutButton.click();
    await driver.sleep(1000);

    // Validate successful logout
    const loginBtnExists = await driver.findElement({ xpath: '//*[@id="login-button"]' });
    assert.ok(loginBtnExists);
  });

  it('should show error on failed login attempt with wrong credentials', async function () {
    const userFailed = credentials.find(item => item.type === 'failed');

    let usernameField = await driver.findElement({ xpath: '//*[@id="user-name"]' });
    await usernameField.sendKeys(userFailed.username);
    let passwordField = await driver.findElement({ xpath: '//*[@id="password"]' });
    await passwordField.sendKeys(userFailed.password);
    let loginButton = await driver.findElement({ xpath: '//*[@id="login-button"]' });
    await loginButton.click();
    const errorMessage = await driver.findElement({ xpath: '//*[@data-test="error"]' });
    const errorMessageText = await errorMessage.getText();

    // Validate unsuccessful login
    assert.strictEqual(
      errorMessageText,
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});