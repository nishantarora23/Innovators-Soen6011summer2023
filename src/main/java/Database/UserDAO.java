package Database;

import Commons.Helper;
import Models.User;

import java.sql.*;
import java.text.ParseException;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserDAO {

    // Insert user data into the users table
    private static String GET_USER_QUERY = "SELECT * FROM users WHERE username = ? AND password = ?";
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        String query1 = "CREATE DATABASE IF NOT EXISTS soen6011";
        String query ="CREATE TABLE IF NOT EXISTS soen6011.users (\n" +
                "  ID int NOT NULL AUTO_INCREMENT,\n" +
                "  FULLNAME varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
                "  USERNAME varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
                "  PASSWORD varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
                "  USER_ROLE varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
                "  ROLE_ID varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                "  EMAIL varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                "  ADDRESS varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                "  DOB date DEFAULT NULL,\n" +
                "  COMPANY_NAME varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                "  COLLEGE_NAME varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                "  PRIMARY KEY (USERNAME)\n" +
                ")";
        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname,Helper.pass)) {
            PreparedStatement statement1 = connection.prepareStatement(query1);
            statement1.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void addUser(User user) throws SQLException {

        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
            String sql = "INSERT INTO soen6011.users (FULLNAME,USERNAME,PASSWORD,USER_ROLE,ROLE_ID,EMAIL,ADDRESS,DOB,\n" +
                    "COMPANY_NAME,COLLEGE_NAME) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, user.getFullName());
            statement.setString(2, user.getUsername());
            statement.setString(3, user.getPassword());
            statement.setString(4, user.getUserRole());
            statement.setString(5, user.getRoleId());
            statement.setString(6, user.getEmail());
            statement.setString(7, user.getAddress());
            statement.setDate(8, user.getDob());
            statement.setString(9, user.getcName());
            statement.setString(10,user.getCollegeName());

            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
    }}
    public static ArrayList<User> getAllUser() throws SQLException {
        ArrayList<User> userList = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            String sql = "SELECT * FROM soen6011.users";
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                User user = new User();
                user.setFullName(resultSet.getString("FULLNAME"));
                user.setUsername(resultSet.getString("USERNAME"));
                user.setPassword(resultSet.getString("PASSWORD"));
                user.setUserRole(resultSet.getString("USER_ROLE"));
                user.setRoleId(resultSet.getString("ROLE_ID"));
                user.setEmail(resultSet.getString("EMAIL"));
                user.setAddress(resultSet.getString("ADDRESS"));
                user.setDob(resultSet.getDate("DOB"));
                user.setcName(resultSet.getString("COMPANY_NAME"));
                user.setCollegeName(resultSet.getString("COLLEGE_NAME"));

                userList.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return userList;
    }

    public static User getUser(String username, String password){
        User user = null;
        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            PreparedStatement statement = connection.prepareStatement(GET_USER_QUERY);
            statement.setString(1, username);
            statement.setString(2, password);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                String retrievedUsername = resultSet.getString("USERNAME");
                String retrievedPassword = resultSet.getString("PASSWORD");
                String retrievedFullName = resultSet.getString("FULLNAME");
                String retrievedUserRole = resultSet.getString("USER_ROLE");
                String retrievedRoleId = resultSet.getString("ROLE_ID");
                String retrievedEmail = resultSet.getString("EMAIL");
                String retrievedAddress = resultSet.getString("ADDRESS");
                Date retrievedDOB = getConvertedDate(resultSet.getString("DOB"));
                String retrievedCompanyName = resultSet.getString("COMPANY_NAME");
                String retrievedCollegeName = resultSet.getString("COLLEGE_NAME");
                user = new User(retrievedFullName, retrievedUsername, retrievedPassword, retrievedUserRole, retrievedEmail, retrievedAddress, retrievedDOB, retrievedCompanyName,retrievedCollegeName);
                if(retrievedUserRole.equals("Student")){
                    user.setCollegeName(retrievedCollegeName);
                }
                user.setRoleId(retrievedRoleId);
            }

        } catch (SQLException | ParseException e) {
            e.printStackTrace();
        }

        return user;
    }
    public static User getUser(String username){
        String GET_USER_QUERY = "SELECT * FROM users WHERE username = ?";
        User user = null;
        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            PreparedStatement statement = connection.prepareStatement(GET_USER_QUERY);
            statement.setString(1, username);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                String retrievedUsername = resultSet.getString("USERNAME");
                String retrievedPassword = resultSet.getString("PASSWORD");
                String retrievedFullName = resultSet.getString("FULLNAME");
                String retrievedUserRole = resultSet.getString("USER_ROLE");
                String retrievedRoleId = resultSet.getString("ROLE_ID");
                String retrievedEmail = resultSet.getString("EMAIL");
                String retrievedAddress = resultSet.getString("ADDRESS");
                Date retrievedDOB = getConvertedDate(resultSet.getString("DOB"));
                String retrievedCompanyName = resultSet.getString("COMPANY_NAME");
                String retrievedCollegeName = resultSet.getString("COLLEGE_NAME");
                user = new User(retrievedFullName, retrievedUsername, retrievedPassword, retrievedUserRole, retrievedEmail, retrievedAddress, retrievedDOB, retrievedCompanyName, retrievedCollegeName);
                if(retrievedUserRole.equals("Student")){
                    user.setCollegeName(retrievedCollegeName);
                }
                user.setRoleId(retrievedRoleId);
            }

        } catch (SQLException | ParseException e) {
            e.printStackTrace();
        }

        return user;
    }
    private static Date getConvertedDate(String dateString) throws ParseException {
        String pattern = "yyyy-MM-dd";

        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
        Date date = dateFormat.parse(dateString);
        return date;
    }
}
