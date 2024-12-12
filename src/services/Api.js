import axios from "axios";

export const loginUser = async (email, username, password) => {
  try {
    const response = await axios.post("https://dummyjson.com/auth/login", {

      username,
      email,
      password,
      expiresInMins: 30,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`https://dummyjson.com/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data.");
  }
};

export const registerUser = async ({ firstName, lastName, gender, email, username, password }) => {
  try {
    const response = await axios.post("https://dummyjson.com/users/add", {
      firstName,
      lastName,
      gender,
      email,
      username,
      password,
    });
    return response.data;
  } catch (err) {
    throw new Error("Registration failed. Please try again.");
  }
};