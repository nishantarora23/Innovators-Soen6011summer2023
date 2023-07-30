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
import util.HttpUtil;

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
		protected void doPost(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

			final String URL = req.getRequestURI();
			String data = HttpUtil.readFromRequest(req);
			JSONObject jsonObject = new JSONObject(data);

			if(URL.contains("removeEmployer")) {
				String username = (String)jsonObject.get("username");
				

			}else if(URL.contains("removeStudent")) {
				String username = (String)jsonObject.get("username");
				
			}
		}
}
