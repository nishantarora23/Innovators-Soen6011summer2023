package test;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class LoginServletIntegrationTest {

	
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
	    public void testLoginAPI() throws IOException {
	    	
	    	 String payload = "{\"username\": \"samSmith08\", \"password\": \"sam@1234\"}";

	    	 // ... (Send an HTTP POST request to the server and get the response)
	        HttpPost httpPost = new HttpPost(BASE_URL + "login");
	        httpPost.setEntity(new StringEntity(payload, ContentType.APPLICATION_JSON));

	        // Set other headers if needed
	        httpPost.addHeader("Authorization", "Bearer your_access_token");

	        // Set the request entity, headers, etc., if needed
	        HttpResponse response = httpClient.execute(httpPost);

	        // Instead of using org.testng.Assert, use org.junit.Assert for assertions
	        assertEquals(200, response.getStatusLine().getStatusCode());

	        // ... (Assert other properties of the response, if needed)
	    }

	    }
