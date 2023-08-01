package Models;

import java.util.Date;

public class JobApplication {

	int jobId;
	String applicantName;
    String submissionDate;
    String status;
    String studentUserName;
    public String getStudentUserName() {
		return studentUserName;
	}
	public void setStudentUserName(String studentUserName) {
		this.studentUserName = studentUserName;
	}

	Boolean notify;

    public JobApplication(String username, int jobId, String submissionDate, String status) {
        this.applicantName = username;
        this.jobId = jobId;
        this.submissionDate = submissionDate;
        this.status = status;
        this.notify=Boolean.FALSE;
    }
    public JobApplication()
    {}

    public String getApplicantname() {
        return applicantName;
    }

    public void setApplicantname(String applicantName) {
        this.applicantName = applicantName;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getSubmissionDate() {
        return this.submissionDate;
    }

    public void setSubmissionDate(String submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getNotify() {
        return notify;
    }

    public void setNotify(Boolean notify) {
        this.notify = notify;
    }
    
    @Override
    public String toString() {
        return "JobApplication{" +
                "jobId=" + jobId +
                ", applicantName='" + applicantName + '\'' +
                ", submissionDate='" + submissionDate + '\'' +
                ", status='" + status + '\'' +
                ", studentUserName='" + studentUserName + '\'' +
                ", notify=" + notify +
                '}';
    }
}
