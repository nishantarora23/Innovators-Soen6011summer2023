package Servlets;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.common.PDStream;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import Commons.Helper;
import Models.User;
import util.util.ResumeUtility;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@WebServlet(name = "ResumeServlet", urlPatterns = { "/resume", "/deleteResume", "/viewResume" })

public class ResumeServlet  extends HttpServlet {

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		final String URL = request.getRequestURI();
		JsonObject jsonPayload = new Gson().fromJson(Helper.getPayload(request), JsonObject.class);
		String username = jsonPayload.get("username").getAsString();
		String prefix =  getServletContext().getRealPath("/WEB-INF/classes/Resume" );
		
		if(URL.contains("deleteResume")) {
			if(ResumeUtility.deleteResume(prefix, username)) {
				response.setStatus(HttpServletResponse.SC_OK);
				return;
			}
			else {
				response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Unable to delete file");
				return;
			}
		}
		else if(URL.contains("viewResume")) {
	        File pdfFile = new File(prefix, username + ".pdf");
	        
	        if (pdfFile.exists()) {
	            response.setContentType("application/pdf");
	            response.setHeader("Content-Disposition", "inline; filename=\"" + pdfFile.getName() + "\"");
	            
	            try (InputStream inputStream = new FileInputStream(pdfFile);
	                 OutputStream outputStream = response.getOutputStream()) {
	                 
	                byte[] buffer = new byte[4096];
	                int bytesRead;
	                
	                while ((bytesRead = inputStream.read(buffer)) != -1) {
	                    outputStream.write(buffer, 0, bytesRead);
	                }
	            }
	        } else {
	            response.getWriter().write("PDF file not found.");
	        }
		}


	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String username = request.getParameter("username");
		String prefix =  getServletContext().getRealPath("/WEB-INF/classes/Resume" );
		String filename = username + ".pdf";

		File file = new File(prefix, filename);

		if (!file.exists()) {
			// Handle the case when the file does not exist
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return;
		}

		try (PDDocument document = PDDocument.load(file);
				InputStream inputStream = new FileInputStream(file)) {

			response.setContentType("application/pdf");
			response.setHeader("Content-Disposition", "inline; filename=" + filename);

			byte[] buffer = new byte[1024];
			int bytesRead;
			OutputStream outputStream = response.getOutputStream();

			while ((bytesRead = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, bytesRead);
			}

			response.setStatus(HttpServletResponse.SC_OK);
		} catch (IOException e) {
			// Handle any potential IO exceptions
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
