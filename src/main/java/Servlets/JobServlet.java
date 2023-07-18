package Servlets;

import Commons.Helper;
import Database.JobDAO;
import Database.UserDAO;
import Models.Job;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/jobOffer")
public class JobServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {
        String payloadData = Helper.getPayload(request);
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setDateFormat("yyyy-MM-dd"); // Set your desired date format pattern
        Gson gson = gsonBuilder.create();
        Job job = gson.fromJson(payloadData, Job.class);
        System.out.println("Payload : " + payloadData);
        try
        {
            JobDAO.addJob(job);
        }
        catch (Exception e)
        {
            response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
            throw e;
        }
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
