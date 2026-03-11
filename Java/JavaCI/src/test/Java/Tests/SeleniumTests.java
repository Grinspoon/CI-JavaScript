package Tests;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;
public class login {
    WebDriver driver;

    @BeforeEach
    void setup() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();

        // När vi kör lokalt så är allt synligt i browsern som vanligt
        // När vi kör i CI måste det köras headless via env-var
        if ("true".equalsIgnoreCase(System.getenv("CI"))) {
            options.addArguments("--headless=new");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
        }

        driver = new ChromeDriver(options);
        driver.manage().window().setSize(new Dimension(1280, 900));
        driver.get("https://seleniumbase.io/demo_page");
    }

    @AfterEach
    void teardown() {
        if (driver != null) driver.quit();
    }

    @Test
    void locatorById_TextInput() throws InterruptedException {
        WebElement input = driver.findElement(By.id("myTextInput"));
        Thread.sleep(2000);
        input.sendKeys("Hejhej!");
        Thread.sleep(2000);
        assertEquals("Hejhej!", input.getAttribute("value"));
    }

    @Test
    void locatorById_HoverDropdownClickLink() throws InterruptedException {
        WebElement DropDown = driver.findElement(By.id("myDropdown"));
        new Actions(driver).moveToElement(DropDown).perform();

        WebElement dropDownLink = driver.findElement(By.id("dropOption2"));
        new Actions(driver).moveToElement(dropDownLink).perform();

        dropDownLink.click();

        WebElement text = driver.findElement(By.xpath("/html/body/form/table/tbody/tr[1]/td[4]/h3"));
        assertEquals(text.getText(), "Link Two Selected");
    }

    @Test
    void VerifyPurpleColorAfterButtonClick() throws InterruptedException {
        WebElement button = driver.findElement(By.id("myButton"));
        button.click();

        WebElement paragraph = driver.findElement(By.id("pText"));
        String color = paragraph.getCssValue("color");

        assertEquals("rgba(128, 0, 128, 1)", color);
    }

    @Test
    void WritePoopAndNavigateToWilliamsGithubProfile(){
        WebElement input = driver.findElement(By.id("myTextInput"));
        input.sendKeys("Poop!");

        WebElement link = driver.findElement(By.id("myLink2"));
        link.click();

        WebElement button = driver.findElement(By.cssSelector(".header-search-button"));
        button.click();

        WebElement searchField = driver.findElement(By.id("query-builder-test"));
        searchField.clear();
        searchField.sendKeys("user:WILGROSS");
        searchField.sendKeys(Keys.ENTER);

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement nameText = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".p-name"))
        );

        assertEquals("William Gross", nameText.getText());
    }

    @Test
    void locatorById_textInput() {
        WebElement input = driver.findElement(By.id("myTextInput"));
        input.sendKeys("Hello via By.id");
        assertEquals("Hello via By.id", input.getAttribute("value"));
    }

    @Test
    void locatorByCss_textarea() {
        WebElement textarea = driver.findElement(By.cssSelector("textarea#myTextarea"));
        textarea.sendKeys("Hello via CSS");
        assertTrue(textarea.getAttribute("value").contains("Hello via CSS"));
    }

    @Test
    void locatorByName_prefilledTextField() {
        WebElement prefilled = driver.findElement(By.name("preText2"));
        prefilled.clear();
        prefilled.sendKeys("Changed via name");
        assertEquals("Changed via name", prefilled.getAttribute("value"));
    }

    @Test
    void locatorByClassName_linkClass() {
        // className tar EN klass, inte "linkClass otherLinkClass"
        WebElement link = driver.findElement(By.className("linkClass"));
        assertTrue(link.isDisplayed());
    }

    @Test
    void locatorByLinkText_clickSeleniumBaseGithubLink() {
        WebElement link = driver.findElement(By.linkText("SeleniumBase on GitHub"));
        link.click();
        assertTrue(driver.getCurrentUrl().toLowerCase().contains("github.com"));
    }

    @Test
    void locatorByPartialLinkText_clickDocsLink() {
        WebElement link = driver.findElement(By.partialLinkText("seleniumbase.io"));
        link.click();
        assertTrue(driver.getCurrentUrl().toLowerCase().contains("seleniumbase.io"));
    }

    @Test
    void locatorByXpath_navigateTheTree_toTextInput() {
        // XPath som går via tabellen -> tbody -> rader -> celler -> input
        WebElement input = driver.findElement(By.xpath("//form[@id='myForm']//table[@id='myTable']//tbody[@id='tbodyId']" +
                "//tr[2]/td[2]//input[@id='myTextInput']"));

        input.sendKeys("Hello via XPath tree");
        assertEquals("Hello via XPath tree", input.getAttribute("value"));
    }

    @Test
    void dropdownAndSelect_example() {
        Select select = new Select(driver.findElement(By.id("mySelect")));
        select.selectByVisibleText("Set to 75%");
        WebElement selected = select.getFirstSelectedOption();
        assertEquals("Set to 75%", selected.getText());
    }

    @Test
    void checkboxAndRadio_example() {
        WebElement checkbox = driver.findElement(By.id("checkBox2"));
        checkbox.click();
        assertTrue(checkbox.isSelected());

        WebElement radio2 = driver.findElement(By.id("radioButton2"));
        radio2.click();
        assertTrue(radio2.isSelected());
    }

    @Test
    void clickButton_example() {
        WebElement btn = driver.findElement(By.id("myButton"));
        btn.click();
        assertTrue(btn.isDisplayed());
    }

    @Test
    void iframe_example_clickCheckboxInIframe() {
        driver.switchTo().frame(driver.findElement(By.id("myFrame3")));
        WebElement cb = driver.findElement(By.id("checkBox6"));
        cb.click();
        assertTrue(cb.isSelected());
        driver.switchTo().defaultContent();
    }
}
