import axios from "axios";

// Create axios instance with base URL and default headers
const authToken = axios.create({
  baseURL: "http://localhost:10000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default authToken;
