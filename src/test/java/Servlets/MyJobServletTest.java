package Servlets;

import Commons.Helper;
import Database.ApplicationDao;
import Models.MyJob;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

/**
 * ResumeServlet Tester.
 *
 * @since <pre>Aug. 8, 2023</pre>
 * @version 1.0
 */
public class MyJobServletTest {


    /**
     *
     * Method: doPost(HttpServletRequest request, HttpServletResponse response)
     *
     */
    @Test
    public void testDoPost() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        ArrayList<MyJob> jobs = new ArrayList<>();
        MyJob job = new MyJob();
        job.setUsername("test");
        jobs.add(job);
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(writer);
        try (MockedStatic<Helper> utilities = Mockito.mockStatic(Helper.class)) {
            utilities.when(() -> Helper.getPayload(any())).thenReturn("{\"username\":\"test\"}");

            try (MockedStatic<ApplicationDao> utility = Mockito.mockStatic(ApplicationDao.class)) {
                utility.when(()->ApplicationDao.getMyJobs("test")).thenReturn(jobs);
                new MyJobsServlet().doPost(request, response);
            }
            writer.flush();
            assertTrue(stringWriter.toString().contains(job.getUsername()));
        }
    }

}
