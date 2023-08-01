package Servlets;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.common.PDStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@WebServlet("/resume")
public class ResumeServlet  extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println(request.getParameter("username"));
        String username = request.getParameter("username");
        String prefix =  getServletContext().getRealPath("/WEB-INF/classes/Resume" );
        String filename = username + ".pdf";

        File file = new File(prefix, filename);

        if (!file.exists()) {
            // Handle the case when the file does not exist
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        try (PDDocument document = PDDocument.load(file);
             InputStream inputStream = new FileInputStream(file)) {

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "inline; filename=" + filename);

            byte[] buffer = new byte[1024];
            int bytesRead;
            OutputStream outputStream = response.getOutputStream();

            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }

            response.setStatus(HttpServletResponse.SC_OK);
        } catch (IOException e) {
            // Handle any potential IO exceptions
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

}
