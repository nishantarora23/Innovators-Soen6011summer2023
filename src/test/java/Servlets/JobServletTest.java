package Servlets;

import Commons.Helper;
import Database.JobDAO;
import Models.Job;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;


public class JobServletTest{

    @Test
    public void testGet() throws IOException, ServletException {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        Job job =new Job();
        job.setTitle("Test JOB");
        try (MockedStatic<JobDAO> utilities = Mockito.mockStatic(JobDAO.class)) {
            utilities.when(() -> JobDAO.getJobId(2)).thenReturn(job);

            StringWriter stringWriter = new StringWriter();
            PrintWriter writer = new PrintWriter(stringWriter);
            when(response.getWriter()).thenReturn(writer);
            when(request.getParameter("id")).thenReturn("2");
            new JobServlet().doGet(request, response);

            verify(request, atLeast(1)).getParameter("username");
            writer.flush();
            assertTrue(stringWriter.toString().contains(job.getTitle()));
        }

    }
    @Test
    public void testPost() throws IOException {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        try (MockedStatic<Helper> utilities = Mockito.mockStatic(Helper.class)) {
            utilities.when(() -> Helper.getPayload(any())).thenReturn("{\"ACTION\":\"ADD\"}");

            when(request.getParameter("id")).thenReturn("2");

            try (MockedStatic<JobDAO> ignored = Mockito.mockStatic(JobDAO.class)) {
                new JobServlet().doPost(request, response);
            }
            verify(response, atLeast(1)).setStatus(HttpServletResponse.SC_OK);
        }

    }
}
