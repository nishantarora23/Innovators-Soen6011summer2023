package Database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;

import Commons.Helper;
import util.util.AdminUtility;

public class AdminDAO {

	static {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			throw new RuntimeException(e);
		}
		/*try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname,Helper.pass)) {

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		 */
	}

	public static JSONArray getListOfStudents() {

		JSONArray arr = new JSONArray();
		try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass))  {
			String query = "select * from users where user_role = ?;";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setString(1, String.valueOf("Student"));
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				arr = AdminUtility.getListOfStudents(rs);
			} else {
				System.out.println("no result found");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return arr;
	}

	public static JSONArray getListOfEmployer() {
		JSONArray arr = new JSONArray();
		try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass))  {
			String query = "select * from users where user_role = ?;";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setString(1, String.valueOf("Employer"));
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				arr = AdminUtility.getListOfEmployers(rs);
			} else {
				System.out.println("no result found");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return arr;
	}

	public static int deleteEmployer(String username) {
		String DELETE_QUERY = "DELETE FROM USERS WHERE USERNAME = ?";
		int n =0;
		try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
			PreparedStatement statement = connection.prepareStatement(DELETE_QUERY);
			statement.setString(1, username);
			n=statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return n;
	}
	public static int deleteStudent(String username) {
		String DELETE_QUERY = "DELETE FROM USERS WHERE USERNAME = ?";
		int n =0;
		try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
			PreparedStatement statement = connection.prepareStatement(DELETE_QUERY);
			statement.setString(1, username);
			n=statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return n;
	}

	public static int updateStudent(String address, String collegeName, String dob, String email, String name, String username) {
		int rowsUpdated =0;
		try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
			String updateQuery = "UPDATE users SET address = ?, college_name = ?, dob = ?, email = ?, fullname = ? WHERE username = ?";
			PreparedStatement preparedStatement = connection.prepareStatement(updateQuery);

			preparedStatement.setString(1, address);
			preparedStatement.setString(2, collegeName);
			preparedStatement.setString(3, dob);
			preparedStatement.setString(4, email);
			preparedStatement.setString(5, name);
			preparedStatement.setString(6, username);

			rowsUpdated = preparedStatement.executeUpdate();

			if (rowsUpdated > 0) {
				System.out.println("User record updated successfully.");
			} else {
				System.out.println("User not found or update failed.");
			}
		} catch (SQLException e) {
			System.out.println("Error executing the update query: " + e.getMessage());
		}
		return rowsUpdated;
	}

	public static int updateEmployer(String address, String companyName, String dob, String email, String name, String username) {
		int rowsUpdated =0;
		try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
			String updateQuery = "UPDATE users SET address = ?, company_name = ?, dob = ?, email = ?, fullname = ? WHERE username = ?";
			PreparedStatement preparedStatement = connection.prepareStatement(updateQuery);

			preparedStatement.setString(1, address);
			preparedStatement.setString(2, companyName);
			preparedStatement.setString(3, dob);
			preparedStatement.setString(4, email);
			preparedStatement.setString(5, name);
			preparedStatement.setString(6, username);

			rowsUpdated = preparedStatement.executeUpdate();

			if (rowsUpdated > 0) {
				System.out.println("User record updated successfully.");
			} else {
				System.out.println("User not found or update failed.");
			}
		} catch (SQLException e) {
			System.out.println("Error executing the update query: " + e.getMessage());
		}
		return rowsUpdated;
	}

	public static JSONArray getListOfCandidates() {
		JSONArray arr = new JSONArray();
		try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass))  {
			String query = "SELECT A.ID, A.APPLICANT, A.JOBID, E.EMPLOYER, E.TITLE, A.STATUS, A.SUBMISSIONDATE, E.EMPLOYER_USERNAME, A.STUDENT_USERNAME FROM "
					+ "APPLICATIONS A, JOBS E WHERE A.JOBID = E.ID;";
			PreparedStatement stmt = connection.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				arr = AdminUtility.getListOfCandidates(rs);
			} else {
				System.out.println("no result found");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return arr;
	}

	public static int deleteJobOffer(int id) {
		String DELETE_QUERY = "DELETE FROM JOBS WHERE ID = ?";
		int n =0;
		try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
			PreparedStatement statement = connection.prepareStatement(DELETE_QUERY);
			statement.setInt(1, id);
			n=statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return n;
	}

	public static int deleteCandidate(int id) {
		String DELETE_QUERY = "DELETE FROM APPLICATIONS WHERE ID = ?";
		int n =0;
		try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
			PreparedStatement statement = connection.prepareStatement(DELETE_QUERY);
			statement.setInt(1, id);
			n=statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return n;
	}

	public static int updateCandidate(int id, String studentName, String status) {
		
		String updateCandidate = "UPDATE APPLICATIONS SET APPLICANT = ?, STATUS = ? WHERE ID = ?;";
		int rowsUpdated =0;
		try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
			PreparedStatement preparedStatement = connection.prepareStatement(updateCandidate);

			preparedStatement.setString(1, studentName);
			preparedStatement.setString(2, status);
			preparedStatement.setInt(3, id);

			rowsUpdated = preparedStatement.executeUpdate();

			if (rowsUpdated > 0) {
				System.out.println("User record updated successfully.");
			} else {
				System.out.println("User not found or update failed.");
			}
		} catch (SQLException e) {
			System.out.println("Error executing the update query: " + e.getMessage());
		}
		return rowsUpdated;
		
	}


}
