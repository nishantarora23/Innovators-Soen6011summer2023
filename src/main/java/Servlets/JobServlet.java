package Servlets;

import Commons.Helper;
import Database.JobDAO;
import Models.Job;
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

@WebServlet("/jobOffer")
public class JobServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String payloadData = Helper.getPayload(request);
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setDateFormat("yyyy-MM-dd"); // Set your desired date format pattern
        Gson gson = gsonBuilder.create();

        String action = request.getParameter("ACTION");
        System.out.println("Action :" + action);
        if("REMOVE".equals(action)){
            JsonObject jsonPayload = new Gson().fromJson(payloadData, JsonObject.class);
            try
            {
                JobDAO.remove(jsonPayload.get("id").getAsString());
            }
            catch (Exception e)
            {
                response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
                throw new RuntimeException(e);
            }
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else if("Update".equals(action)){
            JsonObject jsonPayload = new Gson().fromJson(payloadData, JsonObject.class);
            Job job = JobDAO.getJobId(jsonPayload.get("id").getAsString());
            if(jsonPayload.get("contractType").getAsString() != null)
            {
                job.setContractType(jsonPayload.get("contractType").getAsString());
            }
            if(jsonPayload.get("deadline").getAsString() != null)
            {
                job.setDeadline(jsonPayload.get("deadline").getAsString());
            }
            if(jsonPayload.get("description").getAsString() != null)
            {
                job.setDescription(jsonPayload.get("description").getAsString());
            }
            if(jsonPayload.get("location").getAsString() != null)
            {
                job.setLocation(jsonPayload.get("location").getAsString());
            }
            if(jsonPayload.get("qualifications").getAsString() != null)
            {
                job.setQualifications(jsonPayload.get("qualifications").getAsString());
            }
            if(jsonPayload.get("responsibilities").getAsString() != null)
            {
                job.setResponsibilities(jsonPayload.get("responsibilities").getAsString());
            }
            if(jsonPayload.get("username").getAsString() != null)
            {
                job.setUsername(jsonPayload.get("username").getAsString());
            }
            if(jsonPayload.get("title").getAsString() != null)
            {
                job.setTitle(jsonPayload.get("title").getAsString());
            }
            if(jsonPayload.get("salaryRange").getAsString() != null)
            {
                job.setSalaryRange(jsonPayload.get("salaryRange").getAsString());
            }
            try
            {
                JobDAO.update(job);
            }
            catch (Exception e)
            {
                response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
                throw new RuntimeException(e);
            }
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else {
            Job job = gson.fromJson(payloadData, Job.class);
            try
            {
                JobDAO.addJob(job);
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
        ArrayList<Job> jobs = null;

        String payloadData = Helper.getPayload(request);
        JsonObject jsonPayload = new Gson().fromJson(payloadData, JsonObject.class);
        try {
            if(jsonPayload==null) {
                jobs = JobDAO.getAllJobs();
            }
            else
            {
                String username = jsonPayload.get("username").getAsString();
                jobs = JobDAO.getJob(username);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(jobs);

        // Set the content type of the response
        response.setContentType("application/json");
        System.out.println(json);
        // Write the JSON to the response
        response.getWriter().write(json);
    }
}