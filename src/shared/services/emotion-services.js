import axios from "axios";
import { API_URL } from "../enum";
import { STORAGE_KEY } from "../keys";

const moodURL = `${API_URL.BASE_URL}${API_URL.MOODS}`;
const storedToken = localStorage.getItem(STORAGE_KEY.TOKEN);

// Add a new mood
export const addMood = async (moodDetails) => {
  try {
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
