package Servlets;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;


@MultipartConfig
public class UploadServlet extends HttpServlet {
	private static final String RESUME_DIRECTORY = "Resume";

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String uploadPath = getServletContext().getRealPath("/WEB-INF/classes/" + RESUME_DIRECTORY);
	
		File uploadDir = new File(uploadPath);
		if (!uploadDir.exists()) {
			uploadDir.mkdir();
		}
		 String requestURI = request.getRequestURI();
	        String contextPath = request.getContextPath();
	        String servletPath = request.getServletPath();
	        String pathInfo = request.getPathInfo();
	        String username ="";

	        if (pathInfo != null && pathInfo.length() > 1) {
	            // Remove the leading slash from the pathInfo
	            username = pathInfo.substring(1);
	            
	        } else {
	            // Handle the case where the URL doesn't contain the expected format
	            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid URL format");
	            return;
	        }

		Part part = request.getPart("resume");
		if (part != null) {
		    String desiredFileName = username+".pdf"; // Replace this with your desired file name
		    String filePath = uploadPath + File.separator + desiredFileName;
		    try (InputStream input = part.getInputStream()) {
		    	System.out.println("File Path "+filePath);
		        Files.copy(input, new File(filePath).toPath());
		    }
		} else {
		    // Handle the case when the "resumeFile" part is not found in the request
		    System.out.println("No 'resumeFile' part in the request");
		}

		// Optionally, you can perform additional processing with the uploaded file here.

		response.setStatus(HttpServletResponse.SC_OK);
	}
}
