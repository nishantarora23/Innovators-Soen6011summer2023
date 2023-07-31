const BASE_URL = "http://localhost:8081";

// Students Enrolled

export const fetchStudentEnrolled = async () => {
  let URL = `${BASE_URL}/careerconnect/admin/listOfStudent`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateStudent = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/listOfStudent`;
  try {
    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteStudent = async (studentId) => {
  let URL = `${BASE_URL}/careerconnect/admin/listOfStudent/${studentId}`;
  try {
    const response = await fetch(URL, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
};

// Employers Registered

export const fetchEmployersRegistered = async () => {
  let URL = `${BASE_URL}/careerconnect/admin/listOfEmployer`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const updateEmployer = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/listOfEmployer`;
  try {
    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const deleteEmployer = async (employerId) => {
  let URL = `${BASE_URL}/careerconnect/admin/listOfEmployer/${employerId}`;
  try {
    const response = await fetch(URL, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
};

// Job Posting

export const fetchJobPostList = async () => {
  let URL = `${BASE_URL}/careerconnect/jobOffer`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateJobPost = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/jobOffer`;
  try {
    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteJobPost = async (jobId) => {
  let URL = `${BASE_URL}/careerconnect/jobOffer/${jobId}`;
  try {
    const response = await fetch(URL, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
};

// Candidate Applications

export const fetchCandidateApplicationList = async () => {
  let URL = `${BASE_URL}/careerconnect/admin/listOfCandidateApplications`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateCandidateApplication = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/listOfCandidateApplications`;
  try {
    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteCandidateApplication = async (jobId) => {
  let URL = `${BASE_URL}/careerconnect/admin/listOfCandidateApplications/${jobId}`;
  try {
    const response = await fetch(URL, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
};
