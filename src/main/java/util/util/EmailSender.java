package util.util;

import java.io.UnsupportedEncodingException;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

import Models.Job;
import Models.User;

public class EmailSender {

    public static void sendEmail(User user, Job job) {
    	final String senderEmail = "abc@gmail.com"; // Replace with your sender email
        final String senderPassword = "password"; // Replace with your sender email password
        final String recipientEmail = user.getEmail(); // Replace with recipient email
        
        // Set up properties for the email server
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com"); // For Gmail
        properties.put("mail.smtp.port", "465"); // For Gmail

        // Create a Session object
        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmail, senderPassword);
            }
        });

        try {
            // Create a MimeMessage object
            Message message = new MimeMessage(session);

            // Set the sender and recipient addresses
            String senderName = "CareerConnect Support"; // Change sender name here
            Address senderAddress = new InternetAddress(senderEmail, senderName);
            message.setFrom(senderAddress);
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));

            // Set the email subject and content
            message.setSubject("Important Update Regarding Your Application");
            message.setText("Dear " + user.getFullName() + ",\r\n"
            	    + "\r\n"
            	    + "Your application for " + job.getTitle() + " at " + job.getName() + " has been updated. Please log in to CareerConnect for more details.\r\n"
            	    + "\r\n"
            	    + "Best regards,\r\n"
            	    + "CareerConnect Team\r\n"
            	    + "CareerConnect Support\r\n"
            	    + "Email: support@careerconnect.com\r\n"
            	    + "Phone: +123-456-7890\r\n"
            	    + "\r\n\n"
            	    + "***This is an automatically generated message from the system; please do not email back***");


            // Send the email
            Transport.send(message);

            System.out.println("Email sent successfully.");
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

    }
}


