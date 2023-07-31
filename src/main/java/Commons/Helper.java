package Commons;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;
import java.io.FileInputStream;
import java.io.InputStream;

public class Helper {

    public static String url;
    public static String uname;
    public static String pass;

    static {
        // Access properties using the project object
  	Properties properties = new Properties();
        InputStream input = null;
        try {
 	 input = Helper.class.getClassLoader().getResourceAsStream("dbproperties.properties");
         properties.load(input);

      	url = properties.getProperty("dbUrl","jdbc:mysql://127.0.0.1:3306/soen6011");
        uname = properties.getProperty("dbUsername", "root");
        pass = properties.getProperty("dbPassword", "password");

	System.out.println(url + "  "+ uname+ "  "+pass);

	} catch (IOException e) {
            // Handle the exception if the file is not found or cannot be read
            e.printStackTrace();
        } finally {
            // Close the input stream
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
    }
}
    
  public static String getPayload(HttpServletRequest request) throws IOException {
        StringBuilder payload = new StringBuilder();
        BufferedReader reader = request.getReader();

        String line;
        while ((line = reader.readLine()) != null) {
            payload.append(line);
        }
        return payload.toString();
    }

 }
