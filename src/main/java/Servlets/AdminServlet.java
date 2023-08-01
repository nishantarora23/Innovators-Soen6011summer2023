package Servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import Database.AdminDAO;
import util.util.HttpUtil;

public class AdminServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		final String URL = request.getRequestURI();
		JSONArray array = new JSONArray();
		if(URL.endsWith("listOfStudent")) {
			try {
				array = AdminDAO.getListOfStudents();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		else {
			try {
				array = AdminDAO.getListOfEmployer();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		out.println(array);
		out.flush();

	}

	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		final String URL = request.getRequestURI();
		
		String pathInfo = request.getPathInfo();
		int studentId=0;
		if (pathInfo != null && pathInfo.length() > 1) {
			 studentId = Integer.parseInt(pathInfo.substring(1));
		}
		if(studentId!=0) {
			if(URL.contains("deleteEmployer")) {
				
				int num = AdminDAO.deleteEmployer(studentId);
				if(num>0) {
					response.setStatus(HttpServletResponse.SC_OK);
				}
				else {
					response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
				}
			}else if(URL.contains("deleteStudent")) {
					
				int num = AdminDAO.deleteEmployer(studentId);
				if(num>0) {
					response.setStatus(HttpServletResponse.SC_OK);
				}
				else {
					response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
				}
			}
		}

		}

		@Override
		protected void doPost(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

			final String URL = req.getRequestURI();
			String data = HttpUtil.readFromRequest(req);
			JSONObject jsonObject = new JSONObject(data);


			if(URL.contains("updateEmployer")) {
				String username = (String)jsonObject.get("username");
			}else if(URL.contains("updateStudent")) {
				String username = (String)jsonObject.get("username");				
			}
		}
	}
