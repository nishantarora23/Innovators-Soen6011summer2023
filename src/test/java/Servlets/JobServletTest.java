package Servlets;

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
    public void testPost() throws IOException, ServletException {
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
        } catch (ServletException e) {
            throw e;
        }

    }
}
