package Models;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class JobApplicationTest {

    private JobApplication jobApplication;

    @BeforeEach
    public void setUp() {
        jobApplication = new JobApplication("john.doe", 1, "2023-08-09", "Submitted");
    }

    @Test
    public void testGetApplicantName() {
        assertEquals("john.doe", jobApplication.getApplicantname());
    }

    @Test
    public void testSetApplicantName() {
        jobApplication.setApplicantname("jane.smith");
        assertEquals("jane.smith", jobApplication.getApplicantname());
    }

    @Test
    public void testGetJobId() {
        assertEquals(1, jobApplication.getJobId());
    }

    @Test
    public void testSetJobId() {
        jobApplication.setJobId(2);
        assertEquals(2, jobApplication.getJobId());
    }

    @Test
    public void testGetSubmissionDate() {
        assertEquals("2023-08-09", jobApplication.getSubmissionDate());
    }

    @Test
    public void testSetSubmissionDate() {
        jobApplication.setSubmissionDate("2023-08-10");
        assertEquals("2023-08-10", jobApplication.getSubmissionDate());
    }

    @Test
    public void testGetStatus() {
        assertEquals("Submitted", jobApplication.getStatus());
    }

    @Test
    public void testSetStatus() {
        jobApplication.setStatus("In Progress");
        assertEquals("In Progress", jobApplication.getStatus());
    }

    @Test
    public void testGetNotify() {
        assertEquals(Boolean.FALSE, jobApplication.getNotify());
    }

    @Test
    public void testSetNotify() {
        jobApplication.setNotify(Boolean.TRUE);
        assertEquals(Boolean.TRUE, jobApplication.getNotify());
    }

    @Test
    public void testGetStudentUserName() {
        jobApplication.setStudentUserName("student123");
        assertEquals("student123", jobApplication.getStudentUserName());
    }

    @Test
    public void testToString() {
        String expected = "JobApplication{" +
                "jobId=1, " +
                "applicantName='john.doe', " +
                "submissionDate='2023-08-09', " +
                "status='Submitted', " +
                "studentUserName='null', " +
                "notify=false" +
                "}";
        System.out.println(expected);
        System.out.println(jobApplication);
        assertEquals(expected, jobApplication.toString());
    }
    
    @Test
    public void testDefaultConstructor() {
        JobApplication jobApplication = new JobApplication();

        assertEquals(null, jobApplication.getApplicantname());
        assertEquals(0, jobApplication.getJobId());
        assertEquals(null, jobApplication.getSubmissionDate());
        assertEquals(null, jobApplication.getStatus());
        assertEquals(null, jobApplication.getStudentUserName());
     
    }
}
