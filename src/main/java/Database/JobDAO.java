package Database;

import Commons.Helper;
import Models.Job;

import java.sql.*;
import java.util.ArrayList;

public class JobDAO {
    public static void initialize() {
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                throw new RuntimeException(e);
            }
            String query1 = "CREATE DATABASE IF NOT EXISTS soen6011";
            String query = "CREATE TABLE IF NOT EXISTS soen6011.jobs (\n" +
                    "  ID int NOT NULL AUTO_INCREMENT,\n" +
                    "  TITLE varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
                    "  SALARY_RANGE varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
                    "  RESPONSIBILITIES varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
                    "  QUALIFICATIONS varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
                    "  LOCATION varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                    "  DESCRIPTION varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                    "  DEADLINE varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                    "  CONTRACT_TYPE varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                    "  EMPLOYER varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,\n" +
                    "  STATUS varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT \"active\",\n" +
                    "  PRIMARY KEY (ID)\n" +
                    ")";
            try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
                PreparedStatement statement1 = connection.prepareStatement(query1);
                statement1.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
            try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
                PreparedStatement statement = connection.prepareStatement(query);
                statement.executeUpdate();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
    }

    public static void addJob(Job job) throws SQLException {

        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
            String query = "INSERT INTO jobs (TITLE, SALARY_RANGE, RESPONSIBILITIES, QUALIFICATIONS, LOCATION, " +
                    "DESCRIPTION, DEADLINE, CONTRACT_TYPE, EMPLOYER_USERNAME,EMPLOYER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
            PreparedStatement statement = connection.prepareStatement(query);
                statement.setString(1, job.getTitle());
                statement.setString(2, job.getSalaryRange());
                statement.setString(3, job.getResponsibilities());
                statement.setString(4, job.getQualifications());
                statement.setString(5, job.getLocation());
                statement.setString(6, job.getDescription());
                statement.setString(7, job.getDeadline());
                statement.setString(8, job.getContractType());
                statement.setString(9, job.getUsername());
                statement.setString(10, job.getName());
                statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static ArrayList<Job> getAllJobs() throws SQLException {
        ArrayList<Job> jobList = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            String sql = "SELECT * FROM soen6011.jobs ORDER BY ID DESC";
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Job job = new Job();
                job.setContractType(resultSet.getString("CONTRACT_TYPE"));
                job.setDeadline(resultSet.getString("DEADLINE"));
                job.setDescription(resultSet.getString("DESCRIPTION"));
                job.setID(Integer.parseInt(resultSet.getString("ID")));
                job.setLocation(resultSet.getString("LOCATION"));
                job.setQualifications(resultSet.getString("QUALIFICATIONS"));
                job.setResponsibilities(resultSet.getString("RESPONSIBILITIES"));
                job.setUsername(resultSet.getString("EMPLOYER_USERNAME"));
                job.setSalaryRange(resultSet.getString("SALARY_RANGE"));
                job.setTitle(resultSet.getString("TITLE"));
                job.setStatus(resultSet.getString("STATUS"));
                job.setName(resultSet.getString("EMPLOYER"));
                jobList.add(job);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return jobList;
    }

    public static ArrayList<Job> getJob(String username){
        String GET_JOB_QUERY = "SELECT * FROM JOBS WHERE employer_username = ?";
        ArrayList<Job> jobList = new ArrayList<>();
        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            PreparedStatement statement = connection.prepareStatement(GET_JOB_QUERY);
            statement.setString(1, username);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Job job = new Job();
                job.setContractType(resultSet.getString("CONTRACT_TYPE"));
                job.setDeadline(resultSet.getString("DEADLINE"));
                job.setDescription(resultSet.getString("DESCRIPTION"));
                job.setID(Integer.parseInt(resultSet.getString("ID")));
                job.setLocation(resultSet.getString("LOCATION"));
                job.setQualifications(resultSet.getString("QUALIFICATIONS"));
                job.setResponsibilities(resultSet.getString("RESPONSIBILITIES"));
                job.setUsername(resultSet.getString("EMPLOYER"));
                job.setSalaryRange(resultSet.getString("SALARY_RANGE"));
                job.setTitle(resultSet.getString("TITLE"));
                job.setStatus(resultSet.getString("STATUS"));

                jobList.add(job);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return jobList;
    }
    public static Job getJobId(int id){
        String GET_JOB_QUERY = "SELECT * FROM JOBS WHERE ID = ?";
        Job job = new Job();
        try (Connection connection = DriverManager.getConnection(Helper.url, Helper.uname, Helper.pass)) {
            PreparedStatement statement = connection.prepareStatement(GET_JOB_QUERY);
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();
            if(resultSet.next()){
                job.setContractType(resultSet.getString("CONTRACT_TYPE"));
                job.setDeadline(resultSet.getString("DEADLINE"));
                job.setDescription(resultSet.getString("DESCRIPTION"));
                job.setID(Integer.parseInt(resultSet.getString("ID")));
                job.setLocation(resultSet.getString("LOCATION"));
                job.setQualifications(resultSet.getString("QUALIFICATIONS"));
                job.setResponsibilities(resultSet.getString("RESPONSIBILITIES"));
                job.setUsername(resultSet.getString("EMPLOYER"));
                job.setSalaryRange(resultSet.getString("SALARY_RANGE"));
                job.setTitle(resultSet.getString("TITLE"));
                job.setStatus(resultSet.getString("STATUS"));
                job.setName(resultSet.getString("EMPLOYER"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return job;
    }
    public static void remove(String id) {
        String DELETE_QUERY = "DELETE FROM jobs WHERE ID = ?";
        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
            PreparedStatement statement = connection.prepareStatement(DELETE_QUERY);
            statement.setString(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void update(Job job) {
        try (Connection connection = DriverManager.getConnection(Helper.url,Helper.uname,Helper.pass)) {
            String query = "Update jobs set TITLE=? , SALARY_RANGE=?, RESPONSIBILITIES=?, QUALIFICATIONS=?, LOCATION=?, " +
                    "DESCRIPTION=?, DEADLINE=?, CONTRACT_TYPE=?, STATUS=?, EMPLOYER = ? WHERE Id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, job.getTitle());
            statement.setString(2, job.getSalaryRange());
            statement.setString(3, job.getResponsibilities());
            statement.setString(4, job.getQualifications());
            statement.setString(5, job.getLocation());
            statement.setString(6, job.getDescription());
            statement.setString(7, job.getDeadline());
            statement.setString(8, job.getContractType());
            statement.setString(9,job.getStatus());
            statement.setString(10, job.getName());    
            statement.setString(11, Integer.toString(job.getID()));
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
