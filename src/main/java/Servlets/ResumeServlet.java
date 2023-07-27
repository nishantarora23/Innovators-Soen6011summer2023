package Servlets;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.common.PDStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@WebServlet("/resume")
public class ResumeServlet  extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String prefix = System.getProperty("user.dir")+"/main/resources/resume/";
        System.out.println(prefix+username+".pdf");
        File file = new File(prefix+username+".pdf");
        PDDocument document = PDDocument.load(file);
        PDStream pdfStream = new PDStream(document);
        InputStream inputStream = pdfStream.createInputStream();
        response.getOutputStream().write(inputStream.readAllBytes());
        response.setStatus(HttpServletResponse.SC_OK);
    }

}
