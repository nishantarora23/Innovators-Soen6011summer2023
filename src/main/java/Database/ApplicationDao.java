package Database;

import Commons.Helper;
import Models.Job;
import Models.JobApplication;
import Models.MyJob;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

public class ApplicationDao {
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
//        String query1 = "CREATE DATABASE IF NOT EXISTS soen6011";
//        String query ="CREATE TABLE IF NOT EXISTS soen6011.applications (\n" +
//                "  ID int NOT NULL AUTO_INCREMENT,\n" +
//                "  JOBID int REFERENCES JOBS(ID),\n" +
//                "  APPLICANT varchar(255) COLLATE utf8mb4_unicode_ci REFERENCES USERS(USERNAME), \n" +
//                "  SUBMISSIONDATE date DEFAULT NULL,\n" +
//                "  STATUS varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
//                "  NOTIFY BOOLEAN DEFAULT FALSE, \n"+
//                "  PRIMARY KEY (ID)\n" +
//                ")";
//
//        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname,Helper.pass)) {
//            PreparedStatement statement1 = connection.prepareStatement(query1);
//            statement1.executeUpdate();
//        } catch (SQLException e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
//            PreparedStatement statement = connection.prepareStatement(query);
//            statement.executeUpdate();
//        } catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
    }

    public static void addApplication(JobApplication application) throws SQLException {

        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
            String query = "INSERT INTO applications (APPLICANT, JOBID,SUBMISSIONDATE,STATUS,NOTIFY,STUDENT_USERNAME) VALUES (?, ?,?, ?,?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, application.getUsername());
            statement.setInt(2, application.getJobId());
            statement.setDate(3,application.getSubmissionDate());
            statement.setString(4,application.getStatus());
            statement.setBoolean(5, application.getNotify());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;
        }
    }
    public static ArrayList<Integer> getAllApplications(String applicant) throws SQLException {
        ArrayList<Integer> jobList = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            String sql = "SELECT * FROM soen6011.applications where student_username = ?";
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
    
    public static ArrayList<MyJob> getMyJobs(String applicant) throws SQLException {
     
    	ArrayList<MyJob> appliedJobs = new ArrayList<>();
        
    	try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            String sql = "SELECT * FROM soen6011.applications where student_username = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, applicant);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                int jobId = resultSet.getInt("JOBID");
                Job jobDetails = JobDAO.getJobId(jobId);
                MyJob job = new MyJob();
                job.setContractType(jobDetails.getContractType());
                job.setDeadline(jobDetails.getDeadline());
                job.setDescription(jobDetails.getDescription());
                job.setID(jobDetails.getID());
                job.setLocation(jobDetails.getLocation());
                job.setQualifications(jobDetails.getQualifications());
                job.setResponsibilities(jobDetails.getResponsibilities());
                job.setUsername(jobDetails.getUsername());
                job.setSalaryRange(jobDetails.getSalaryRange());
                job.setTitle(jobDetails.getTitle());
                job.setSubmissionDate(resultSet.getString("SUBMISSIONDATE"));
                job.setJobstatus(resultSet.getString("STATUS"));
                appliedJobs.add(job);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    

        return appliedJobs;
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
                application.setNotify(resultSet.getBoolean("NOTIFY"));
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
    public static void updateStatus(String applicant, int jobId,String status) {
        String query = "Update applications set STATUS=?, Notify=true WHERE APPLICANT = ? and JOBID = ?";
        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, status);
            statement.setString(2, applicant);
            statement.setInt(3,jobId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static HashMap<Integer,String> getNotifications(String username) throws SQLException {
        HashMap<Integer,String> notification = new HashMap<>();

        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            String sql = "SELECT JOBID,STATUS FROM soen6011.applications WHERE APPLICANT = ? and Notify = true";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, username);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                notification.put(Integer.parseInt(resultSet.getString("JOBID")),resultSet.getString("STATUS"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return notification;
    }
}
