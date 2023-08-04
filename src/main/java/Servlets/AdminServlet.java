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
		else if(URL.endsWith("listOfCandidates")) {
			try {
				System.out.println("came here");
				array = AdminDAO.getListOfCandidates();
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
	protected void doPost(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

		final String URL = req.getRequestURI();
		String data = HttpUtil.readFromRequest(req);
		JSONObject jsonObject = new JSONObject(data);
		String username = (String)jsonObject.get("username");

		if(URL.contains("updateEmployer")) {
			String address = (String)jsonObject.get("address");
			String company_name = (String)jsonObject.get("company_name");
			String dob = (String)jsonObject.get("dob");
			String email = (String)jsonObject.get("email");
			String name = (String)jsonObject.get("name");

			int num = AdminDAO.updateEmployer(address, company_name, dob, email, name, username);
			if(num>0) {
				response.setStatus(HttpServletResponse.SC_OK);
			}
			else {
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
			}
		}else if(URL.contains("updateStudent")) {
			String address = (String)jsonObject.get("address");
			String college_name = (String)jsonObject.get("college_name");
			String dob = (String)jsonObject.get("dob");
			String email = (String)jsonObject.get("email");
			String name = (String)jsonObject.get("name");
			int num = AdminDAO.updateStudent(address, college_name, dob, email, name, username);	
			if(num>0) {
				response.setStatus(HttpServletResponse.SC_OK);
			}
			else {
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
			}
		}
		else if(URL.contains("deleteEmployer")) {

			int num = AdminDAO.deleteEmployer(username);
			if(num>0) {
				response.setStatus(HttpServletResponse.SC_OK);
			}
			else {
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
			}
		}else if(URL.contains("deleteStudent")) {				
			int num = AdminDAO.deleteStudent(username);
			if(num>0) {
				response.setStatus(HttpServletResponse.SC_OK);
			}
			else {
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
			}
		}
	}
}
