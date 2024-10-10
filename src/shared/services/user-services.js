import axios from "axios";
import { API_URL } from "../enum";

const usersURL = `${API_URL.BASE_URL}${API_URL.USERS}`;

export const userSignIn = async (userDetails) => {
  try {
    const response = await axios.post(
      `${usersURL}${API_URL.LOGIN}`,
      userDetails
    );
    return response.data.data;
  } catch (error) {
    console.error("Error signing in:", error.response.data);
    throw error.response.data;
  }
};
