package githubActionsTest;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class getRequest {
    void main() {
        // Run headless Chrome instance
        org.openqa.selenium.chrome.ChromeOptions options = new org.openqa.selenium.chrome.ChromeOptions();
        options.addArguments("--incognito");
        options.addArguments("--headless");
        WebDriver driver = new ChromeDriver(options);

        // Create GET request and validate 200 response
        try {
            java.net.URI url = new java.net.URI("https://fakestoreapi.com/products");
            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                    .uri(url)
                    .GET()
                    .build();

            java.net.http.HttpResponse<String> response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                System.out.println("- Passed: Got a 200 status response from the API");
            } else {
                System.out.println("- Failed: 200 status response failed from the API, instead got: " + response.statusCode());
            }
        } catch (Exception e) {
            System.out.println("- Failed: Exception occurred while sending GET request: " + e.getMessage());
            e.printStackTrace();
        }
      
        driver.quit();
    }
}
