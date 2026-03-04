package localTests;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class getRequest {
    void main() {
        try {
            URI url = new URI("https://fakestoreapi.com/products");
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(url)
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                System.out.println("Passed: Got a 200 status response from the API");
            } else {
                System.out.println("Failed: Expected 200 status response, but got: " + response.statusCode());
            }

            java.nio.file.Path mockPath = java.nio.file.Paths.get("Java/src/main/java/localTests/mockData.json");
            String mockJson = java.nio.file.Files.readString(mockPath);

            // Parse API response JSON and mock JSON
            org.json.JSONArray apiArray = new org.json.JSONArray(response.body());
            org.json.JSONArray mockArray = new org.json.JSONArray(mockJson);
            // INSERT_YOUR_CODE
            // Assert that apiArray and mockArray are equal in length and content
            if (apiArray.length() != mockArray.length()) {
                throw new AssertionError("apiArray and mockArray have different lengths: " + apiArray.length() + " vs " + mockArray.length());
            }
            for (int i = 0; i < apiArray.length(); i++) {
                Object apiObj = apiArray.get(i);
                Object mockObj = mockArray.get(i);
                if (!apiObj.equals(mockObj)) {
                    throw new AssertionError("apiArray and mockArray differ at index " + i + ":\nAPI: " + apiObj + "\nMock: " + mockObj);
                }
            }



            

            // Print index 14 (15th element) for both arrays
            //System.out.println(apiArray.get(14));
            //System.out.println(mockArray.get(14));

            if (apiArray.get(14).equals(mockArray.get(14))) {
                throw new AssertionError("apiArray and mockArray are not equal");
            } 





            

        } catch (Exception e) {
            System.out.println("Failed: Exception occurred while sending GET request: " + e.getMessage());
            e.printStackTrace();
        }

    }
}