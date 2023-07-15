package Servlets;

import Database.UserDAO;
import Models.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/users")
public class UserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        StringBuilder payload = new StringBuilder();
        BufferedReader reader = request.getReader();

        String line;
        while ((line = reader.readLine()) != null) {
            payload.append(line);
        }

        String payloadData = payload.toString();
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setDateFormat("yyyy-MM-dd"); // Set your desired date format pattern
        Gson gson = gsonBuilder.create();
        User user = gson.fromJson(payloadData, User.class);
        System.out.println("Payload : " + payloadData);
        // TODO set roleId
        switch (user.getUserRole()) {
            case "Student" -> {
                user.setCollegeName(user.getcName());
                user.setCompanyName(null);
            }
            case "Employer" -> {
                user.setCompanyName(user.getcName());
                user.setCollegeName(null);
            }
        }
       try {
            UserDAO.addUser(user);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        response.setStatus(HttpServletResponse.SC_OK);
    }
}