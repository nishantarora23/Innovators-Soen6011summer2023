package Models;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class JobTest {

    private static Job job;

    @BeforeAll
    public static void setUp() {
        // Create a new instance of Job before running the tests
        job = new Job(1, "Software Engineer", "60,000 - 80,000", "Design, develop, test, review",
                "Masters in Computer Science", "Montreal, QC, CA", "Looking a Software Engineer", "2023-08-31", "Full-time", "Robert","Active","robert08");
    }

    @Test
    public void testGetters() {
        assertEquals(1, job.getID());
        assertEquals("Software Engineer", job.getTitle());
        assertEquals("60,000 - 80,000", job.getSalaryRange());
        assertEquals("Design, develop, test, review", job.getResponsibilities());
        assertEquals("Masters in Computer Science", job.getQualifications());
        assertEquals("Montreal, QC, CA", job.getLocation());
        assertEquals("Looking a Software Engineer", job.getDescription());
        assertEquals("2023-08-31", job.getDeadline());
        assertEquals("Full-time", job.getContractType());
    }

    @Test
    public void testSetters() {
        // Test setters
        job.setID(2);
        job.setTitle("Product Manager");
        job.setSalaryRange("80,000 - 100,000");
        job.setResponsibilities("Product development and management");
        job.setQualifications("Masters degree in Business");
        job.setLocation("Toronto, ON, CA");
        job.setDescription("Looking for a Project Manager");
        job.setDeadline("2023-09-30");
        job.setContractType("Contract");
        job.setUsername("Samuel");

        assertEquals(2, job.getID());
        assertEquals("Product Manager", job.getTitle());
        assertEquals("80,000 - 100,000", job.getSalaryRange());
        assertEquals("Product development and management", job.getResponsibilities());
        assertEquals("Masters degree in Business", job.getQualifications());
        assertEquals("Toronto, ON, CA", job.getLocation());
        assertEquals("Looking for a Project Manager", job.getDescription());
        assertEquals("2023-09-30", job.getDeadline());
        assertEquals("Contract", job.getContractType());
        assertEquals("Samuel", job.getUsername());
    }

    @Test
    public void testEmptyConstructor() {
        // Test empty constructor
        Job emptyJob = new Job();
        assertNull(emptyJob.getUsername());
        // Add more assertions if needed for other properties
    }
}
