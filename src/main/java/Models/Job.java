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
    private String username;
    private String name;

    public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	private String status = "active";

    public Job(int ID, String title, String salaryRange, String responsibilities, String qualifications,
               String location, String description, String deadline, String contractType, String employerID,String status,String name) {
        this.ID = ID;
        this.title = title;
        this.salaryRange = salaryRange;
        this.responsibilities = responsibilities;
        this.qualifications = qualifications;
        this.location = location;
        this.description = description;
        this.deadline = deadline;
        this.contractType = contractType;
        this.username = employerID;
        this.status =status;
        this.name =name;
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

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
