package Servlets;

import Commons.Helper;
import Database.ApplicationDao;
import Database.JobDAO;
import Database.UserDAO;
import Models.JobApplication;
import Models.Job;
import Models.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

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

        if("REMOVE".equals(action)){
            try
            {
                ApplicationDao.remove(jsonPayload.get("username").getAsString(),jsonPayload.get("jobId").getAsInt());
            }
            catch (Exception e)
            {
                response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
                throw new RuntimeException(e);
            }
            response.setStatus(HttpServletResponse.SC_OK);
        } else if("ADD".equals(action)){
            try
            {
                JobApplication application = gson.fromJson(payloadData, JobApplication.class);
                ApplicationDao.addApplication(application);
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
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String json=null;
        ObjectMapper objectMapper = new ObjectMapper();
        String username = request.getParameter("username");
        String id = request.getParameter("id");
        try {
                if(username!=null) {
                    ArrayList<Integer> jobIds = ApplicationDao.getAllApplications(username);
                    ArrayList<Job> appliedJobs = new ArrayList<>();
                    for(int jobId : jobIds)
                    {
                        appliedJobs.add(JobDAO.getJobId(jobId));
                    }
                    json = objectMapper.writeValueAsString(appliedJobs);
                }
                else{
                    ArrayList<User> applicants = new ArrayList<>();
                    ArrayList<String> usernames = ApplicationDao.getAllApplicants(Integer.parseInt(id));
                    for(String user : usernames)
                    {
                        applicants.add(UserDAO.getUser(user));
                    }
                    json = objectMapper.writeValueAsString(applicants);
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
