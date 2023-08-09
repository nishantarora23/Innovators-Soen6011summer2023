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

	// Handle POST requests for file uploads
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// Get the upload path where files will be stored on the server
		String uploadPath = getServletContext().getRealPath("/WEB-INF/classes/" + RESUME_DIRECTORY);
		// Create the upload directory if it doesn't exist

		File uploadDir = new File(uploadPath);
		if (!uploadDir.exists()) {
			uploadDir.mkdir();
		}
		// Get the URI and path information from the request
		String requestURI = request.getRequestURI();
		String pathInfo = request.getPathInfo();
		String username = "";
		// Extract the username from the path info
		if (pathInfo != null && pathInfo.length() > 1) {
			username = pathInfo.substring(1);

		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid URL format");
			return;
		}
		// Get the uploaded file part
		Part part = request.getPart("resume");
		if (part != null) {
			// Define the desired file name based on the username
			String desiredFileName = username + ".pdf";
			String filePath = uploadPath + File.separator + desiredFileName;
			// Copy the contents of the uploaded file to the server's file path

			try (InputStream input = part.getInputStream()) {
				System.out.println("File Path " + filePath);
				Files.copy(input, new File(filePath).toPath());
			}
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST, "\"No 'resumeFile' part in the request\"");
			return;

		}

		// Indicate a successful upload
		response.setStatus(HttpServletResponse.SC_OK);
	}
}
