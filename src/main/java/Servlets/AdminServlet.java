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
import Database.JobDAO;
import Models.Job;
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

		if(URL.contains("updateEmployer")) {
			String username = (String)jsonObject.get("username");
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
			String username = (String)jsonObject.get("username");
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
			String username = (String)jsonObject.get("username");
			int num = AdminDAO.deleteEmployer(username);
			if(num>0) {
				response.setStatus(HttpServletResponse.SC_OK);
			}
			else {
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
			}
		}else if(URL.contains("deleteStudent")) {	
			String username = (String)jsonObject.get("username");
			int num = AdminDAO.deleteStudent(username);
			if(num>0) {
				response.setStatus(HttpServletResponse.SC_OK);
			}
			else {
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
			}
		}else if(URL.contains("deleteJobOffer")) {
			int id = (int)jsonObject.get("id");
			int num = AdminDAO.deleteJobOffer(id);
			if(num>0) {
				response.setStatus(HttpServletResponse.SC_OK);
			}
			else {
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
			}
		}else if(URL.contains("updateJobOffer")) {


			int id = (int)jsonObject.get("id");
			String contractType = jsonObject.getString("contractType");
			String deadline = jsonObject.getString("deadline");
			String description = jsonObject.getString("description");
			String location = jsonObject.getString("location");
			String name = jsonObject.isNull("username") ? null : jsonObject.getString("username");
			String qualifications = jsonObject.getString("qualifications");
			String responsibilities = jsonObject.getString("responsibilities");
			String salaryRange = jsonObject.getString("salaryRange");
			String status = jsonObject.isNull("status") ? null : jsonObject.getString("status");
			String title = jsonObject.getString("title");
//			String username = jsonObject.getString("username");
			Job updatedJob = new Job(id, title, salaryRange, responsibilities, qualifications,
					location, description, deadline, contractType, "", status,name);
			try
			{
				JobDAO.update(updatedJob);
			}
			catch (Exception e)
			{
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
				throw new RuntimeException(e);
			}
			response.setStatus(HttpServletResponse.SC_OK);

		}else if(URL.contains("updateCandidate")) {


			int id = jsonObject.getInt("candidateID");
			String employerName = jsonObject.getString("employerName");
			String employerUsername = jsonObject.getString("employer_username");
			String jobID = jsonObject.getString("jobid");
			String status = jsonObject.getString("status");
			String studentName = jsonObject.getString("studentName");
			String studentUsername = jsonObject.getString("student_username");
			String submissionDate = jsonObject.getString("submissionDate");
			String title = jsonObject.getString("title");
			int num = AdminDAO.updateCandidate(id,studentName,status);
			if(num>0) {
				response.setStatus(HttpServletResponse.SC_OK);
			}
			else {
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
			}


		}else if(URL.contains("deleteListOfCandidates")) {


			int id = (int)jsonObject.getInt("candidateID");

			int num = AdminDAO.deleteCandidate(id);
			if(num>0) {
				response.setStatus(HttpServletResponse.SC_OK);
			}
			else {
				response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
			}
		}
	}
}
