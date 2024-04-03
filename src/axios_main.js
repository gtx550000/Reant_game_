import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export const setAuthToken = (token) => {
  try {
    if (token) {
      Instance.defaults.headers.authorization = `Bearer ${token}`;
      localStorage.setItem("token", token); // Store token in localStorage
    }
  } catch (error) {
    console.error("Error setting auth token:", error);
  }
};

export const removeAuthToken = () => {
  try {
    delete Instance.defaults.headers.authorization;
    localStorage.removeItem("token"); // Remove token from localStorage
  } catch (error) {
    console.error("Error removing auth token:", error);
  }
};
export const refreshPage = () => {
  Instance.defaults.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
};
export default Instance;
