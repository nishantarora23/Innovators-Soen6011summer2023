package test;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import static org.junit.Assert.assertEquals;

public class JobServletIntegrationTest {
    private static final String BASE_URL = "http://localhost:8080/careerconnect/"; // Adjust the URL as needed
    private HttpClient httpClient;

    @Before
    public void setup() {
        // Initialize the HTTP client before each test
        httpClient = HttpClients.createDefault();
    }

    @After
    public void cleanup() {
        // Close the HTTP client after each test
        httpClient.getConnectionManager().shutdown();
    }

    @Test
    public void testGetListOfJob() throws IOException {
        // ... (Send an HTTP POST request to the server and get the response)
        HttpGet httpGet = new HttpGet(BASE_URL + "jobOffer");
        // Set the request entity, headers, etc., if needed
        HttpResponse response = httpClient.execute(httpGet);

        // Instead of using org.testng.Assert, use org.junit.Assert for assertions
        assertEquals(200, response.getStatusLine().getStatusCode());

        // ... (Assert other properties of the response, if needed)
    }
}