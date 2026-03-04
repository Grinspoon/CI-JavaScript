package githubActionsTest;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class getRequest {
    public static void main(String[] args) {
        try {
            URI url = new URI("https://fakestoreapi.com/products");
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(url)
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                System.out.println("Passed: Response is: " + response.body());
            } else {
                System.out.println("Failed: Expected 200 status response, but got: " + response.statusCode());
            }

        } catch (Exception e) {
            System.out.println("Failed: Exception occurred while sending GET request: " + e.getMessage());
            e.printStackTrace();
        }

    }
}