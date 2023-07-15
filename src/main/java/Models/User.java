package Models;

import java.text.ParseException;
import java.util.Date;

public class User {
    private String fullName;
    private String email;
    private String password;
    private String userRole;
    private Date dob;
    private String companyName;
    private String username;
    private String address;
    private String collegeName;
    private String roleId;
    private String cName;

    public User(String fullName, String username, String password, String userRole, String email, String address, java.util.Date dob, String companyName) throws ParseException {
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.userRole = userRole;
        this.email = email;
        this.address = address;
        this.dob = dob;
        this.companyName = companyName;
        System.out.println("Inside USer constructor");
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

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }


    public String getcName() {
        return cName;
    }
    public java.sql.Date getDob() {
        return new java.sql.Date(dob.getTime());
    }

    public String getCompanyName() {
        return companyName;
    }


}
