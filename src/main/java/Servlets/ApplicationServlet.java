package Servlets;

import Commons.Helper;
import Database.ApplicationDao;
import Database.JobDAO;
import Database.UserDAO;
import Models.JobApplication;
import Models.MyJob;
import Models.Job;
import Models.User;
import util.util.EmailSender;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@WebServlet("/application")
public class ApplicationServlet extends HttpServlet {

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String payloadData = Helper.getPayload(request);

		JsonObject jsonPayload = new Gson().fromJson(payloadData, JsonObject.class);
		String action = jsonPayload.get("ACTION").getAsString();

		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setDateFormat("yyyy-MM-dd"); // Set your desired date format pattern
		Gson gson = gsonBuilder.create();

		if("REMOVE".equalsIgnoreCase(action)){
			try
			{
				ApplicationDao.remove(jsonPayload.get("username").getAsString(),jsonPayload.get("jobId").getAsInt());
				ArrayList<MyJob> appliedJobs = new ArrayList<>();
				ObjectMapper objectMapper = new ObjectMapper();
				String json=null;
				try {
					appliedJobs = ApplicationDao.getMyJobs(jsonPayload.get("username").getAsString());
					json = objectMapper.writeValueAsString(appliedJobs);
					response.setContentType("application/json");
					// Write the JSON to the response
					response.getWriter().write(json);
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			catch (Exception e)
			{
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
				throw new RuntimeException(e);
			}
			response.setStatus(HttpServletResponse.SC_OK);
		} else if("ADD".equalsIgnoreCase(action)){
			try
			{
				//check if resume is there or not
				String username = jsonPayload.get("username").getAsString();
				String prefix =  getServletContext().getRealPath("/WEB-INF/classes/Resume" );
				String filename = username + ".pdf";

				File file = new File(prefix, filename);

				if (!file.exists()) {
					// Handle the case when the file does not exist
					response.setStatus(HttpServletResponse.SC_NOT_FOUND);
					return;
				}

				JobApplication application = new JobApplication();
				application.setApplicantname(jsonPayload.get("applicant").getAsString());
				application.setJobId(Integer.valueOf(jsonPayload.get("jobid").getAsString()));
				application.setStudentUserName(username);
				LocalDate today = LocalDate.now();

				// Format the date to "YYYY-MM-DD"
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
				String todayDateString = today.format(formatter);
				application.setSubmissionDate(todayDateString);
				application.setStatus("PENDING");
				application.setNotify(false);
				ApplicationDao.addApplication(application);
			}
			catch (Exception e)
			{
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
				System.out.println(e.getMessage());
			}
			response.setStatus(HttpServletResponse.SC_OK);
		}
		else if("SELECT".equals(action)){
			try
			{
				int num = ApplicationDao.updateStatus(jsonPayload.get("username").getAsString(),jsonPayload.get("jobId").getAsInt(),jsonPayload.get("status").getAsString());
				User user = UserDAO.getUser(jsonPayload.get("username").getAsString());

				Job job = JobDAO.getJobId(jsonPayload.get("jobId").getAsInt());

				if(num>0) {
					EmailSender.sendEmail(user,job);
				}
			}
			catch (Exception e)
			{
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
				throw new RuntimeException(e);
			}
			response.setStatus(HttpServletResponse.SC_OK);
		}
	}
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String json=null;
		ObjectMapper objectMapper = new ObjectMapper();
		String username = request.getParameter("username");
		String id = request.getParameter("jobId");
		String action=request.getParameter("action");
		try {
			switch (action) {
			case "getApllications" : {
				ArrayList<Integer> jobIds = ApplicationDao.getAllApplications(username);
				ArrayList<Job> appliedJobs = new ArrayList<>();
				for (int jobId : jobIds) {
					appliedJobs.add(JobDAO.getJobId(jobId));
				}
				json = objectMapper.writeValueAsString(appliedJobs);
			}
			case "getApplicants" : {
				ArrayList<User> applicants = new ArrayList<>();
				ArrayList<String> usernames = ApplicationDao.getAllApplicants(Integer.parseInt(id));
				System.out.println("Applicants are "+usernames);
				for (String user : usernames) {
					applicants.add(UserDAO.getUser(user));
				}
				json = objectMapper.writeValueAsString(applicants);
				break;
			}
			case "getNotifications" : {
				HashMap<Integer,String> notifications = new HashMap<>();
				notifications = ApplicationDao.getNotifications(username);
				json = objectMapper.writeValueAsString(notifications);
			}
			}
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
		// Set the content type of the response
		response.setContentType("application/json");
		// Write the JSON to the response
		response.getWriter().write(json);
	}

}
