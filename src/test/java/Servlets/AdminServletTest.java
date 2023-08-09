package Servlets;

import Commons.Helper;
import Database.AdminDAO;
import Database.ApplicationDao;
import Models.MyJob;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import util.util.HttpUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.atLeast;

public class AdminServletTest {

    /**
     *
     * Method: doPost(HttpServletRequest request, HttpServletResponse response)
     *
     */
    @Test
    public void testDoPost() throws Exception {
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);

        when(request.getRequestURI()).thenReturn("testupdateEmployer");
        String payload="{\"username\":\"test\",\"address\":\"temp\",\"company_name\":\"test\",\"dob\":\"test\",\"email\":\"test\",\"name\":\"test\"}";

        try (MockedStatic<HttpUtil> utilities = Mockito.mockStatic(HttpUtil.class)) {
            utilities.when(() -> HttpUtil.readFromRequest(request)).thenReturn(payload);

            try (MockedStatic<AdminDAO> utility = Mockito.mockStatic(AdminDAO.class)) {
                utility.when(()->AdminDAO.updateEmployer(any(),any(),any(),any(),any(),any())).thenReturn(1);
                new AdminServlet().doPost(request, response);
            }
        }

        verify(response, atLeast(1)).setStatus(HttpServletResponse.SC_OK);
    }
}
