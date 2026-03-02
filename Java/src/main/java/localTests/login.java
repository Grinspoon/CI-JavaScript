package localTests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;

public class login {
    public static void main(String[] args) {
        org.openqa.selenium.chrome.ChromeOptions options = new org.openqa.selenium.chrome.ChromeOptions();
        options.addArguments("--incognito");
        WebDriver driver = new ChromeDriver(options);

        // Navigate to saucedemo
        driver.get("https://www.saucedemo.com");
        driver.manage().window().maximize();
        
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException(e);
        }

        // Setup credentials for successful login
        String passedUsername = "visual_user";
        String passedPassword = "secret_sauce";

        // Automate successful login
        WebElement usernameField = driver.findElement(By.xpath("//*[@id=\"user-name\"]"));
        usernameField.sendKeys(passedUsername);

        WebElement passwordField = driver.findElement(By.xpath("//*[@id=\"password\"]"));
        passwordField.sendKeys(passedPassword);

        WebElement loginButton = driver.findElement(By.xpath("//*[@id=\"login-button\"]"));
        loginButton.click();

        WebElement inventoryHeader = driver.findElement(By.xpath("//*[@id=\"header_container\"]/div[2]/span"));
        String inventoryHeaderText = inventoryHeader.getText();

        // Validate successful login
        if (!"Products".equals(inventoryHeaderText)) {
            throw new AssertionError("Expected 'Products' but got '" + inventoryHeaderText + "'");
        }

        if (inventoryHeader.isDisplayed()) {
            System.out.println("- Login successful: Passed");
          } else {
            System.out.println("- Login successful: Failed");
          }
          
          try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException(e);
        }

        // Automate logout
        WebElement menuButton = driver.findElement(By.xpath("//*[@id=\"react-burger-menu-btn\"]"));
        menuButton.click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException(e);
        }

        WebElement logoutButton = driver.findElement(By.xpath("//*[@id=\"logout_sidebar_link\"]"));
        logoutButton.click();

        // Setup credentials for failed login
        String failedUsername = "wrong_user";
        String failedPassword = "no_secret_sauce";

        // Automate failed login
        usernameField = driver.findElement(By.xpath("//*[@id=\"user-name\"]"));
        usernameField.sendKeys(failedUsername);

        passwordField = driver.findElement(By.xpath("//*[@id=\"password\"]"));
        passwordField.sendKeys(failedPassword);

        loginButton = driver.findElement(By.xpath("//*[@id=\"login-button\"]"));
        loginButton.click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException(e);
        }

        WebElement errorMessage = driver.findElement(By.xpath("//*[@data-test=\"error\"]"));
        String errorMessageText = errorMessage.getText();

        // Validate failed login
        if (!errorMessageText.equals("Epic sadface: Username and password do not match any user in this service")) {
            throw new AssertionError("Error message on failed login not asserted.");
        }

        WebElement errorContainer = driver.findElement(By.xpath("//*[@id=\"login_button_container\"]/div/form/div[3]"));

        if (errorContainer.isDisplayed()) {
            System.out.println("- Login unsuccessful: Passed");
        } else {
            System.out.println("- Login unsuccessful: Failed");
        }

        driver.quit();
    }
}
