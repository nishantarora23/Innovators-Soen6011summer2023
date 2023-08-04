const BASE_URL = "http://localhost:8080";

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
    return { error: "Something went wrong!" };
  }
};

export const updateStudent = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/updateStudent`;
  try {
    const response = await fetch(URL, {
      method: "POST",
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
    return { error: "Something went wrong!" };
  }
};

export const deleteStudent = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/deleteStudent`;
  try {
    const response = await fetch(URL, {
      method: "POST",
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
    return { error: "Something went wrong!" };
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
    return { error: "Something went wrong!" };
  }
};

export const updateEmployer = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/updateEmployer`;
  try {
    const response = await fetch(URL, {
      method: "POST",
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
    return { error: "Something went wrong!" };
  }
};

export const deleteEmployer = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/deleteEmployer`;
  try {
    const response = await fetch(URL, {
      method: "POST",
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
    return { error: "Something went wrong!" };
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
    return { error: "Something went wrong!" };
  }
};

export const updateJobPost = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/updateJobOffer`;
  try {
    const response = await fetch(URL, {
      method: "POST",
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
    return { error: "Something went wrong!" };
  }
};

export const deleteJobPost = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/deleteJobOffer`;
  try {
    const response = await fetch(URL, {
      method: "POST",
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
    return { error: "Something went wrong!" };
  }
};

// Candidate Applications

export const fetchCandidateApplicationList = async () => {
  let URL = `${BASE_URL}/careerconnect/admin/listOfCandidates`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const updateCandidateApplication = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/updateCandidate`;
  try {
    const response = await fetch(URL, {
      method: "POST",
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
    return { error: "Something went wrong!" };
  }
};

export const deleteCandidateApplication = async (payload) => {
  let URL = `${BASE_URL}/careerconnect/admin/deleteListOfCandidates`;
  try {
    const response = await fetch(URL, {
      method: "POST",
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
    return { error: "Something went wrong!" };
  }
};
