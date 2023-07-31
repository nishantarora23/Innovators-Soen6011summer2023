import Database.JobDAO;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class ContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        JobDAO.initialize();
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        // Code for cleanup tasks
        // This method will be called when the application is shutting down
    }
}
