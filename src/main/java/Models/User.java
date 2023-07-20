package Models;

import java.text.ParseException;
import java.util.Date;

public class User {
    private String fullName;
    private String email;
    private String password;
    private String userRole;
    private Date dob;
    private String username;
    private String address;
    private String collegeName;
    private String roleId;
    private String cName;

    public User(String fullName, String username, String password, String userRole, String email, String address, java.util.Date dob, String companyName, String collegeName) throws ParseException {
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.userRole = userRole;
        this.email = email;
        this.address = address;
        this.dob = dob;
        this.cName = companyName;
        this.collegeName = collegeName;
    }
    public User()
    {
        // Do Nothing;
    }

    public String getFullName() {
        return fullName;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getUserRole() {
        return userRole;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }


    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setcName(String cName) {
        this.cName = cName;
    }

    public String getcName() {
        return cName;
    }
    public java.sql.Date getDob() {
        return new java.sql.Date(dob.getTime());
    }

}
