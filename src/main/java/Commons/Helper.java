package Commons;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

public class Helper {

    public static String url = "jdbc:mysql://Localhost:3306/soen6011";
    public static String uname = "root";
    public static String pass = "password";
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
