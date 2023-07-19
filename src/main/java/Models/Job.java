package Models;

public class Job {
    private int ID;
    private String title;
    private String salaryRange;
    private String responsibilities;
    private String qualifications;
    private String location;
    private String description;
    private String deadline;
    private String contractType;
    private String employerName;

    public Job(int ID, String title, String salaryRange, String responsibilities, String qualifications,
               String location, String description, String deadline, String contractType, String employerID) {
        this.ID = ID;
        this.title = title;
        this.salaryRange = salaryRange;
        this.responsibilities = responsibilities;
        this.qualifications = qualifications;
        this.location = location;
        this.description = description;
        this.deadline = deadline;
        this.contractType = contractType;
    }
    public Job()
    {}

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSalaryRange() {
        return salaryRange;
    }

    public void setSalaryRange(String salaryRange) {
        this.salaryRange = salaryRange;
    }

    public String getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(String responsibilities) {
        this.responsibilities = responsibilities;
    }

    public String getQualifications() {
        return qualifications;
    }

    public void setQualifications(String qualifications) {
        this.qualifications = qualifications;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getContractType() {
        return contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    public String getEmployerName() {
        return employerName;
    }
}
