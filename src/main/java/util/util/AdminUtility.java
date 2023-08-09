package util.util;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class AdminUtility {
	// Convert ResultSet of student data into a JSONArray

	public static JSONArray getListOfStudents(ResultSet rs) {
		JSONArray arr = new JSONArray();
		try {
			// Loop through the ResultSet and create JSON objects for each student
			do {
				JSONObject obj = new JSONObject();
				obj.put("id", rs.getString("ID"));
				obj.put("username", rs.getString("USERNAME"));
				obj.put("name", rs.getString("FULLNAME"));
				obj.put("email", rs.getString("EMAIL"));
				obj.put("address", rs.getString("ADDRESS"));
				obj.put("dob", rs.getString("DOB"));
				obj.put("email", rs.getString("EMAIL"));
				obj.put("college_name", rs.getString("COLLEGE_NAME"));
				arr.put(obj);
			} while (rs.next());
		} catch (JSONException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return arr;
	}

	// Convert ResultSet of employer data into a JSONArray
	public static JSONArray getListOfEmployers(ResultSet rs) {
		JSONArray arr = new JSONArray();
		try {
			// Loop through the ResultSet and create JSON objects for each employer

			do {
				JSONObject obj = new JSONObject();
				obj.put("id", rs.getString("ID"));
				obj.put("username", rs.getString("USERNAME"));
				obj.put("name", rs.getString("FULLNAME"));
				obj.put("email", rs.getString("EMAIL"));
				obj.put("address", rs.getString("ADDRESS"));
				obj.put("dob", rs.getString("DOB"));
				obj.put("email", rs.getString("EMAIL"));
				obj.put("company_name", rs.getString("COMPANY_NAME"));
				arr.put(obj);
			} while (rs.next());
		} catch (JSONException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return arr;
	}

	// Convert ResultSet of candidate data into a JSONArray
	public static JSONArray getListOfCandidates(ResultSet rs) throws SQLException {
		JSONArray candidateArray = new JSONArray();
		// Loop through the ResultSet and create JSON objects for each candidate
		do {
			JSONObject candidateObject = new JSONObject();
			candidateObject.put("studentName", rs.getString("APPLICANT"));
			candidateObject.put("jobid", rs.getString("JOBID"));
			candidateObject.put("employerName", rs.getString("EMPLOYER"));
			candidateObject.put("title", rs.getString("TITLE"));
			candidateObject.put("status", rs.getString("STATUS"));
			candidateObject.put("submissionDate", rs.getString("SUBMISSIONDATE"));
			candidateObject.put("candidateID", rs.getString("ID"));
			candidateObject.put("employer_username", rs.getString("EMPLOYER_USERNAME"));
			candidateObject.put("student_username", rs.getString("STUDENT_USERNAME"));

			candidateArray.put(candidateObject);
		} while (rs.next());

		return candidateArray;
	}
}
