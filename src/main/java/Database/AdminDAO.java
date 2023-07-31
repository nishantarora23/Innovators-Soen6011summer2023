package Database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;

import Commons.Helper;
import util.AdminUtility;

public class AdminDAO {

	 static {
	        try {
	            Class.forName("com.mysql.cj.jdbc.Driver");
	        } catch (ClassNotFoundException e) {
	            throw new RuntimeException(e);
	        }
	        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname,Helper.pass)) {
	           
	        } catch (SQLException e) {
	            e.printStackTrace();
	            throw new RuntimeException(e);
	        }
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
}
