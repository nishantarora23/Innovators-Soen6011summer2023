package Database;

import Manager.DatabaseManager;
import Models.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UserDAO {

    // Insert user data into the users table
    static DatabaseManager manager;
    static {
        // TODO update jndiname
        manager = new DatabaseManager("jdbc/soen6011");
    }
    public static void addUser(User user) throws SQLException {
        try (Connection connection = manager.getConnection()) {
            String sql = "INSERT INTO users (FULLNAME,USERNAME,PASSWORD,USER_ROLE,ROLE_ID,EMAIL,ADDRESS,DOB,\n" +
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
            statement.setString(9, user.getCompanyName());
            statement.setString(10,user.getCollegeName());

            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
    }}
}
