import axios from "axios";
import { API_URL } from "../enum";
import { getTokenAsync } from "./global-services";

const moodURL = `${API_URL.BASE_URL}${API_URL.MOODS}`;

// Add a new mood
export const addMood = async (moodDetails) => {
  try {
    const storedToken = await getTokenAsync();
    const response = await axios.post(`${moodURL}${API_URL.ADD}`, moodDetails, {
      headers: {
        "Content-Type": "application/json",
        ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
      },
    });
    return response.data; // Return the added mood object
  } catch (error) {
    throw error.response;
  }
};

// Get moods with filters
export const getMoods = async (filters) => {
  try {
    const storedToken = await getTokenAsync();
    const {
      userId,
      moodCode,
      startDate,
      endDate,
      sortAscending = true,
    } = filters;

    const response = await axios.get(moodURL, {
      params: {
        userId,
        moodCode,
        startDate,
        endDate,
        sortAscending,
      },
      headers: {
        "Content-Type": "application/json",
        ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
      },
    });
    return response.data; // Return the filtered moods
  } catch (error) {
    throw error.response;
  }
};

// Update mood by ID
export const updateMoodById = async (id, moodDetails) => {
  try {
    const storedToken = await getTokenAsync();
    const response = await axios.put(
      `${moodURL}${API_URL.UPDATE}/${id}`,
      moodDetails,
      {
        headers: {
          "Content-Type": "application/json",
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

// Get students with mood today
export const getStudentsWithMoodToday = async (filters) => {
  try {
    const storedToken = await getTokenAsync();
    const {
      sortBy = "lastName", // Default sort by firstName
      sortAscending = true, // Default sorting order is ascending
      page = 0, // Default page number
      size = null, // Default page size
      ignorePagination = false, // Default page size
    } = filters;

    const response = await axios.get(
      `${moodURL}${API_URL.STUDENT_MOOD_TODAY}`,
      {
        params: {
          sortBy,
          sortAscending,
          page,
          size,
          ignorePagination,
        },
        headers: {
          "Content-Type": "application/json",
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
