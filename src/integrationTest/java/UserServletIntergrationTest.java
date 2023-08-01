package test;

import static org.junit.Assert.assertEquals;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

public class UserServletIntergrationTest {
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
    public void testAddUser() throws IOException {
        // Prepare the payload data for the POST request
        String payload = "{"
                + "\"address\": \"1999 Boulevard De Maissoneueve\","
                + "\"cName\": \"\","
                + "\"collegeName\": \"Concordia University\","
                + "\"confirmPassword\": \"mer08\","
                + "\"dob\": \"2023-07-31\","
                + "\"email\": \"jimmy04@gmail.com\","
                + "\"fullName\": \"Jimmy Smith\","
                + "\"password\": \"jimmy08\","
                + "\"userRole\": \"Student\","
                + "\"username\": \"jimmy\""
                + "}";
        // Create an HTTP POST request to the "/users" endpoint
        HttpPost httpPost = new HttpPost(BASE_URL + "users");
        httpPost.setEntity(new StringEntity(payload, ContentType.APPLICATION_JSON));

        // Execute the POST request
        HttpResponse response = httpClient.execute(httpPost);

        // Check if the response status code is 200 (OK)
        assertEquals(200, response.getStatusLine().getStatusCode());

    }

}

