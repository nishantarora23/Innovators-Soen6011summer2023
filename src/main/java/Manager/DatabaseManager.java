package Manager;

import java.sql.Connection;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class DatabaseManager {
    private DataSource dataSource;
    public DatabaseManager(String jndiname){
        try {
            Context context = (Context) new InitialContext().lookup("java:comp/env/" );
            dataSource = (DataSource) context.lookup(jndiname);

        } catch (NamingException e) {
            // Handle error that it's not configured in JNDI.
            throw new IllegalStateException(jndiname + " is missing in JNDI!", e);
        }
    }
    public Connection getConnection() {
        try {
            return dataSource.getConnection();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }
}