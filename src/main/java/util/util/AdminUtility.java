package util.util;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class AdminUtility {

	public static JSONArray getListOfStudents(ResultSet rs) {
		JSONArray arr = new JSONArray();
		try {
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
			}while(rs.next());
		} catch (JSONException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		return arr;
	}
	
	public static JSONArray getListOfEmployers(ResultSet rs) {
		JSONArray arr = new JSONArray();
		try {
			do {
				JSONObject obj = new JSONObject();
				obj.put("id", rs.getString("ID"));
				obj.put("username", rs.getString("USERNAME"));
				obj.put("name", rs.getString("FULLNAME"));
				obj.put("email",rs.getString("EMAIL"));
				obj.put("address",rs.getString("ADDRESS"));
				obj.put("dob",rs.getString("DOB"));
				obj.put("email",rs.getString("EMAIL"));
				obj.put("company_name",rs.getString("COMPANY_NAME"));
				arr.put(obj);
			}while(rs.next());
		} catch (JSONException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 

		return arr;
	}


    public static JSONArray getListOfCandidates(ResultSet rs) throws SQLException {
        JSONArray candidateArray = new JSONArray();

        do {
            JSONObject employerObject = new JSONObject();
            employerObject.put("studentName", rs.getString("APPLICANT"));
            employerObject.put("jobid", rs.getString("JOBID"));
            employerObject.put("employerName", rs.getString("EMPLOYER"));
            employerObject.put("title", rs.getString("TITLE"));
            employerObject.put("status", rs.getString("STATUS"));
            employerObject.put("submissionDate", rs.getString("SUBMISSIONDATE"));

            candidateArray.put(employerObject);
        }
        while(rs.next());

        return candidateArray;
    }
}
