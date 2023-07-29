package Database;

import Commons.Helper;
import Models.JobApplication;

import java.sql.*;
import java.util.ArrayList;

public class ApplicationDao {
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        String query1 = "CREATE DATABASE IF NOT EXISTS soen6011";
        String query ="CREATE TABLE IF NOT EXISTS soen6011.applications (\n" +
                "  ID int NOT NULL AUTO_INCREMENT,\n" +
                "  JOBID int REFERENCES JOBS(ID),\n" +
                "  APPLICANT varchar(255) COLLATE utf8mb4_unicode_ci REFERENCES USERS(USERNAME), \n" +
                "  SUBMISSIONDATE date DEFAULT NULL,\n" +
                "  STATUS varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                "  PRIMARY KEY (ID)\n" +
                ")";
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://Localhost:3306/", Helper.uname,Helper.pass)) {
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

    public static void addApplication(JobApplication application) throws SQLException {

        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
            String query = "INSERT INTO applications (APPLICANT, JOBID,SUBMISSIONDATE,STATUS) VALUES (?, ?,?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, application.getUsername());
            statement.setInt(2, application.getJobId());
            statement.setDate(3,application.getSubmissionDate());
            statement.setString(4,application.getStatus());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;
        }
    }
    public static ArrayList<Integer> getAllApplications(String applicant) throws SQLException {
        ArrayList<Integer> jobList = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            String sql = "SELECT * FROM soen6011.applications where APPLICANT = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, applicant);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                jobList.add(resultSet.getInt("JOBID"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return jobList;
    }
    public static ArrayList<String> getAllApplicants(int jobId) throws SQLException {
        ArrayList<String> applicants = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            String sql = "SELECT * FROM soen6011.applications where JOBID = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, jobId);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                applicants.add(resultSet.getString("APPLICANT"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return applicants;
    }
    public static ArrayList<JobApplication> getAllApplications() throws SQLException {
        ArrayList<JobApplication> applications = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            String sql = "SELECT * FROM soen6011.applications";
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                JobApplication application = new JobApplication();
                application.setUsername(resultSet.getString("APPLICANT"));
                application.setSubmissionDate(resultSet.getDate("SUBMISSIONDATE"));
                application.setJobId(Integer.parseInt(resultSet.getString("JOBID")));
                application.setStatus(resultSet.getString("STATUS"));
                applications.add(application);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return applications;
    }
    public static void remove(String applicant, int jobId) {
        String DELETE_QUERY = "DELETE FROM applications WHERE APPLICANT = ? and JOBID = ?";
        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
            PreparedStatement statement = connection.prepareStatement(DELETE_QUERY);
            statement.setString(1, applicant);
            statement.setInt(2,jobId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static String getStatus(String applicant, int jobId) {
        String query = "SELECT * FROM applications WHERE APPLICANT = ? and JOBID = ?";
        String status ="";
        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, applicant);
            statement.setInt(2,jobId);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                status = resultSet.getString("STATUS");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return status;
    }
}
