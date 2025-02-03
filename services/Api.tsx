import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// API Instance for general requests
const Api = axios.create({
  baseURL: "http://192.168.29.38:5000/api/", // Update to your backend URL or use an environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for requests
Api.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        // Add token to Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Error fetching token from AsyncStorage:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Interceptors for responses
Api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    // Check if the response status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized. Redirecting to login...");

      // Clear token from AsyncStorage
      await AsyncStorage.removeItem("authToken");

      // Redirect logic: Replace with your navigation method
      // Example: Using React Navigation
      const navigation = error?.config?.navigation;
      if (navigation) {
        navigation.navigate("Login"); // Navigate to the Login screen
      }
    }
    return Promise.reject(error); // Handle other response errors
  }
);

// Another Axios instance for specific use cases
const Api2 = axios.create({
  baseURL: "http://localhost:5000", // Adjust for your backend
});

// Google Auth function
export const googleAuth = (code) => Api2.get(`api/google?code=${code}`);

export default Api;
