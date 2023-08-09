package Models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class MyJobTest {

    @Test
    public void testGettersAndSetters() {
        MyJob job = new MyJob();

        job.setID(1);
        job.setTitle("Software Engineer");
        job.setSalaryRange("50000 - 70000");
        job.setResponsibilities("Develop and maintain software.");
        job.setQualifications("Bachelor's degree in Computer Science.");
        job.setLocation("New York");
        job.setDescription("Join our dynamic team of software engineers.");
        job.setDeadline("2023-08-31");
        job.setContractType("Full-time");
        job.setUsername("john.doe");
        job.setStatus("inactive");
        job.setSubmissionDate("2023-08-01");
        job.setJobstatus("completed");

        assertEquals(1, job.getID());
        assertEquals("Software Engineer", job.getTitle());
        assertEquals("50000 - 70000", job.getSalaryRange());
        assertEquals("Develop and maintain software.", job.getResponsibilities());
        assertEquals("Bachelor's degree in Computer Science.", job.getQualifications());
        assertEquals("New York", job.getLocation());
        assertEquals("Join our dynamic team of software engineers.", job.getDescription());
        assertEquals("2023-08-31", job.getDeadline());
        assertEquals("Full-time", job.getContractType());
        assertEquals("john.doe", job.getUsername());
        assertEquals("inactive", job.getStatus());
        assertEquals("2023-08-01", job.getSubmissionDate());
        assertEquals("completed", job.getJobstatus());
    }
}
