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

        JsonObject jsonPayload = new Gson().fromJson(payloadData, JsonObject.class);
        String action = jsonPayload.get("ACTION").getAsString();
        System.out.println("Action :" + action);
        if("REMOVE".equals(action)){
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
            Job job = JobDAO.getJobId(jsonPayload.get("id").getAsInt());
            if(!jsonPayload.get("contractType").isJsonNull())
            {
                job.setContractType(jsonPayload.get("contractType").getAsString());
            }
            if(!jsonPayload.get("deadline").isJsonNull())
            {
                job.setDeadline(jsonPayload.get("deadline").getAsString());
            }
            if(!jsonPayload.get("description").isJsonNull())
            {
                job.setDescription(jsonPayload.get("description").getAsString());
            }
            if(!jsonPayload.get("location").isJsonNull())
            {
                job.setLocation(jsonPayload.get("location").getAsString());
            }
            if(!jsonPayload.get("qualifications").isJsonNull())
            {
                job.setQualifications(jsonPayload.get("qualifications").getAsString());
            }
            if(!jsonPayload.get("responsibilities").isJsonNull())
            {
                job.setResponsibilities(jsonPayload.get("responsibilities").getAsString());
            }
            if(!jsonPayload.get("username").isJsonNull())
            {
                job.setUsername(jsonPayload.get("username").getAsString());
            }
            if(!jsonPayload.get("title").isJsonNull())
            {
                job.setTitle(jsonPayload.get("title").getAsString());
            }
            if(!jsonPayload.get("salaryRange").isJsonNull())
            {
                job.setSalaryRange(jsonPayload.get("salaryRange").getAsString());
            }
            if(!jsonPayload.get("status").isJsonNull())
            {
                job.setStatus(jsonPayload.get("status").getAsString());
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
        String json=null;
        ObjectMapper objectMapper = new ObjectMapper();
        String username = request.getParameter("username");
        String id = request.getParameter("id");
        try {
            if(id==null && username==null) {
                jobs = JobDAO.getAllJobs();
                json = objectMapper.writeValueAsString(jobs);
            }
            else
            {
                if(username!=null) {
                    jobs = JobDAO.getJob(username);
                    json = objectMapper.writeValueAsString(jobs);
                }
                else{
                    Job job = JobDAO.getJobId(Integer.parseInt(id));
                    json = objectMapper.writeValueAsString(job);
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