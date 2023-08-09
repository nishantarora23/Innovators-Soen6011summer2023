package util;

import org.junit.jupiter.api.Test;
import util.util.ResumeUtility;

import static org.junit.jupiter.api.Assertions.assertFalse;

public class ResumeUtilityTest {
    @Test
    public void testDeleteResume()
    {
        assertFalse(ResumeUtility.deleteResume("test","test.pdf"));

    }
}
