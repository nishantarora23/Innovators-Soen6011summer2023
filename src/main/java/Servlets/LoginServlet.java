package Servlets;

import Database.UserDAO;
import Models.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet{

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String payloadData = this.getPayload(request).toString();
        User user = null;
        JsonObject jsonPayload = new Gson().fromJson(payloadData, JsonObject.class);

        user = UserDAO.getUser(jsonPayload.get("username").getAsString(), jsonPayload.get("password").getAsString());
        System.out.println("User : " + user);
        try {
            UserDAO.addUser(user);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(user);

        response.setContentType("application/json");

        response.getWriter().write(jsonResponse);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private StringBuilder getPayload(HttpServletRequest request) throws IOException {
        StringBuilder payload = new StringBuilder();
        BufferedReader reader = request.getReader();

        String line;
        while ((line = reader.readLine()) != null) {
            payload.append(line);
        }
        return payload;
    }
}
