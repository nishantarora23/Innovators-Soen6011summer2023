package util.util;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;

public class AdminUtilityTest {

	private ResultSet resultSet;


	@Test
	public void testGetListOfStudents() throws SQLException {
		resultSet = mock(ResultSet.class);
		when(resultSet.next()).thenReturn(true, true, false); // Simulate 2 rows in the ResultSet
		when(resultSet.getString("ID")).thenReturn("1", "2");
		when(resultSet.getString("USERNAME")).thenReturn("user1", "user2");
		when(resultSet.getString("FULLNAME")).thenReturn("John Doe", "Jane Smith");
		when(resultSet.getString("EMAIL")).thenReturn("john@example.com", "jane@example.com");
		when(resultSet.getString("ADDRESS")).thenReturn("123 Main St", "456 Elm St");
		when(resultSet.getString("DOB")).thenReturn("1990-01-01", "1985-05-10");
		when(resultSet.getString("COLLEGE_NAME")).thenReturn("ABC College", "XYZ University");
		JSONArray studentsArray = AdminUtility.getListOfStudents(resultSet);
		assertEquals(3, studentsArray.length());

		JSONObject student1 = studentsArray.getJSONObject(0);
		assertEquals("1", student1.getString("id"));
		assertEquals("user1", student1.getString("username"));
		assertEquals("John Doe", student1.getString("name"));
		assertEquals("123 Main St", student1.getString("address"));
		assertEquals("1990-01-01", student1.getString("dob"));
		assertEquals("ABC College", student1.getString("college_name"));

		JSONObject student2 = studentsArray.getJSONObject(1);
		assertEquals("2", student2.getString("id"));
		assertEquals("user2", student2.getString("username"));
		assertEquals("Jane Smith", student2.getString("name"));
		assertEquals("jane@example.com", student2.getString("email"));
		assertEquals("456 Elm St", student2.getString("address"));
		assertEquals("1985-05-10", student2.getString("dob"));
		assertEquals("XYZ University", student2.getString("college_name"));
	}

	@Test
	public void testGetListOfEmployers() throws SQLException {
		resultSet = mock(ResultSet.class);
		when(resultSet.next()).thenReturn( false); // Simulate 2 rows in the ResultSet
		when(resultSet.getString("ID")).thenReturn("1");
		when(resultSet.getString("USERNAME")).thenReturn("employer1");
		when(resultSet.getString("FULLNAME")).thenReturn("ACME Inc.");
		when(resultSet.getString("EMAIL")).thenReturn("employer1@example.com");
		when(resultSet.getString("ADDRESS")).thenReturn("789 Commerce Ave");
		when(resultSet.getString("DOB")).thenReturn("1980-06-15");
		when(resultSet.getString("COMPANY_NAME")).thenReturn("ACME Inc.");

		JSONArray employersArray = AdminUtility.getListOfEmployers(resultSet);
		assertEquals(1, employersArray.length());

		JSONObject employer1 = employersArray.getJSONObject(0);
		assertEquals("1", employer1.getString("id"));
		assertEquals("employer1", employer1.getString("username"));
		assertEquals("ACME Inc.", employer1.getString("name"));
		assertEquals("789 Commerce Ave", employer1.getString("address"));
		assertEquals("1980-06-15", employer1.getString("dob"));
		assertEquals("ACME Inc.", employer1.getString("company_name"));


	}
	
	 @Test
	    public void testGetListOfCandidates() throws SQLException {
		 resultSet = mock(ResultSet.class);
	        when(resultSet.next()).thenReturn(false); // Simulate 1 row in the ResultSet
	        when(resultSet.getString("APPLICANT")).thenReturn("John Doe");
	        when(resultSet.getString("JOBID")).thenReturn("123");
	        when(resultSet.getString("EMPLOYER")).thenReturn("ACME Inc.");
	        when(resultSet.getString("TITLE")).thenReturn("Software Engineer");
	        when(resultSet.getString("STATUS")).thenReturn("Pending");
	        when(resultSet.getString("SUBMISSIONDATE")).thenReturn("2023-08-01");
	        when(resultSet.getString("ID")).thenReturn("1");
	        when(resultSet.getString("EMPLOYER_USERNAME")).thenReturn("employer1");
	        when(resultSet.getString("STUDENT_USERNAME")).thenReturn("student1");
		 
		 	JSONArray candidatesArray = AdminUtility.getListOfCandidates(resultSet);
	        assertEquals(1, candidatesArray.length());

	        JSONObject candidate = candidatesArray.getJSONObject(0);
	        assertEquals("John Doe", candidate.getString("studentName"));
	        assertEquals("123", candidate.getString("jobid"));
	        assertEquals("ACME Inc.", candidate.getString("employerName"));
	        assertEquals("Software Engineer", candidate.getString("title"));
	        assertEquals("Pending", candidate.getString("status"));
	        assertEquals("2023-08-01", candidate.getString("submissionDate"));
	        assertEquals("1", candidate.getString("candidateID"));
	        assertEquals("employer1", candidate.getString("employer_username"));
	        assertEquals("student1", candidate.getString("student_username"));
	    }
}

