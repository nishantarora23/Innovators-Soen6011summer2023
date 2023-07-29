package Models;

import java.util.Date;

public class JobApplication {

    String username;
    int jobId;
    Date submissionDate;
    String status;

    public JobApplication(String username, int jobId, Date submissionDate, String status) {
        this.username = username;
        this.jobId = jobId;
        this.submissionDate = submissionDate;
        this.status = status;
    }
    public JobApplication()
    {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public java.sql.Date getSubmissionDate() {
        return new java.sql.Date(submissionDate.getTime());
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
