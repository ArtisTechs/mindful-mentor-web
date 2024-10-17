import axios from "axios";
import { API_URL, RoleEnum } from "../enum";
import { STORAGE_KEY } from "../keys";
import { capitalizeText } from "./global-services";

const usersURL = `${API_URL.BASE_URL}${API_URL.USERS}`;
const storedToken = localStorage.getItem(STORAGE_KEY.TOKEN);

export const userSignIn = async (userDetails) => {
  try {
    const response = await axios.post(
      `${usersURL}${API_URL.LOGIN}`,
      userDetails
    );
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const userSignUp = async (userDetails) => {
  try {
    const response = await axios.post(
      `${usersURL}${API_URL.SIGNUP}`,
      userDetails
    );
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(
      `${usersURL}${API_URL.PROFILE}/${userId}`,
      {
        headers: {
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

// Adjusted function for updating user profile with file upload
export const saveUserProfile = async (userId, profileData) => {
  try {
    const formData = new FormData();

    // Append profile data fields with the correct structure
    formData.append("firstName", capitalizeText(profileData.firstName));
    formData.append("middleName", capitalizeText(profileData.middleName) || "");
    formData.append("lastName", capitalizeText(profileData.lastName));
    formData.append("email", profileData.email);
    formData.append("password", profileData.password || "");
    formData.append("phoneNumber", profileData.phoneNumber || "");
    formData.append("studentNumber", profileData.studentNumber);

    // Append file (if exists)
    if (
      profileData.profilePicture &&
      profileData.profilePicture instanceof File
    ) {
      formData.append("file", profileData.profilePicture); // 'file' is the key expected by the backend
    }

    // Perform the PUT request with FormData
    const response = await axios.put(
      `${usersURL}${API_URL.PROFILE}/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response;
  }
};

// Fetch student list with filters, pagination, and sorting
export const fetchStudentList = async ({
  status = "",
  searchName = "",
  page = 0,
  size = null,
  sortBy = "lastName",
  sortDirection = "ASC",
}) => {
  try {
    const response = await axios.get(`${usersURL}${API_URL.LIST}`, {
      params: {
        status,
        role: RoleEnum.STUDENT,
        searchName,
        page,
        size,
        sortBy,
        sortDirection,
      },
      headers: {
        ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const changeUserStatus = async (id, status) => {
  try {
    const response = await axios.post(`${usersURL}${API_URL.STATUS}`, null, {
      params: { id, status },
      headers: {
        ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error.response.data; // Handle error
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${usersURL}${API_URL.DELETE}/${userId}`,
      {
        headers: {
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
        },
      }
    );
    return response.data; // Return the response from the server (success message)
  } catch (error) {
    throw error.response.data; // Handle error
  }
};

export const fetchCounselorList = async ({
  status = "",
  searchName = "",
  page = 0,
  size = null,
  sortBy = "lastName",
  sortDirection = "ASC",
}) => {
  try {
    const response = await axios.get(`${usersURL}${API_URL.LIST}`, {
      params: {
        status,
        role: RoleEnum.COUNSELOR,
        searchName,
        page,
        size,
        sortBy,
        sortDirection,
      },
      headers: {
        ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
