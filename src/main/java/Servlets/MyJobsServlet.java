package Servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import Commons.Helper;
import Database.ApplicationDao;
import Database.JobDAO;
import Models.Job;
import Models.MyJob;

public class MyJobsServlet extends HttpServlet{

	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String json=null;
        ObjectMapper objectMapper = new ObjectMapper();
        String payloadData = Helper.getPayload(request);
        JsonObject jsonPayload = new Gson().fromJson(payloadData, JsonObject.class);

        String username = jsonPayload.get("username").getAsString();
        ArrayList<MyJob> appliedJobs = new ArrayList<>();
		try {
			appliedJobs = ApplicationDao.getMyJobs(username);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

        json = objectMapper.writeValueAsString(appliedJobs);
        response.setContentType("application/json");
        // Write the JSON to the response
        response.getWriter().write(json);
	}
}
