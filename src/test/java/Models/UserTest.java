package Models;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserTest {

    private User user;

    @BeforeEach
    public void setUp() throws ParseException {
        String fullName = "John Doe";
        String username = "johndoe";
        String password = "password";
        String userRole = "user";
        String email = "johndoe@example.com";
        String address = "123 Main St";
        String collegeName = "ABC University";
        Date dob = new SimpleDateFormat("yyyy-MM-dd").parse("1990-01-01");

        user = new User(fullName, username, password, userRole, email, address, dob, "", collegeName);
    }

    @Test
    public void testGetFullName() {
        assertEquals("John Doe", user.getFullName());
    }

    @Test
    public void testGetUsername() {
        assertEquals("johndoe", user.getUsername());
    }

    @Test
    public void testGetPassword() {
        assertEquals("password", user.getPassword());
    }

    @Test
    public void testGetUserRole() {
        assertEquals("user", user.getUserRole());
    }

    @Test
    public void testGetEmail() {
        assertEquals("johndoe@example.com", user.getEmail());
    }

    @Test
    public void testGetAddress() {
        assertEquals("123 Main St", user.getAddress());
    }

    @Test
    public void testGetCollegeName() {
        assertEquals("ABC University", user.getCollegeName());
    }

    @Test
    public void testSetCollegeName() {
        user.setCollegeName("XYZ College");
        assertEquals("XYZ College", user.getCollegeName());
    }

    @Test
    public void testSetRoleId() {
        user.setRoleId("123");
        assertEquals("123", user.getRoleId());
    }

    @Test
    public void testSetFullName() {
        user.setFullName("Jane Doe");
        assertEquals("Jane Doe", user.getFullName());
    }

    @Test
    public void testSetEmail() {
        user.setEmail("janedoe@example.com");
        assertEquals("janedoe@example.com", user.getEmail());
    }

    @Test
    public void testSetPassword() {
        user.setPassword("newpassword");
        assertEquals("newpassword", user.getPassword());
    }

    @Test
    public void testSetUserRole() {
        user.setUserRole("admin");
        assertEquals("admin", user.getUserRole());
    }

    @Test
    public void testSetDob() throws ParseException {
        Date newDob = new SimpleDateFormat("yyyy-MM-dd").parse("1995-05-05");
        user.setDob(newDob);
        assertEquals(newDob, user.getDob());
    }

    @Test
    public void testSetUsername() {
        user.setUsername("janedoe");
        assertEquals("janedoe", user.getUsername());
    }

    @Test
    public void testSetAddress() {
        user.setAddress("456 Elm St");
        assertEquals("456 Elm St", user.getAddress());
    }

    @Test
    public void testSetcName() {
        user.setcName("New Company");
        assertEquals("New Company", user.getcName());
    }

    @Test
    public void testGetcName() {
        assertEquals("", user.getcName());
    }

    @Test
    public void testGetDob() {
        assertEquals(new java.sql.Date(user.getDob().getTime()), user.getDob());
    }
}
