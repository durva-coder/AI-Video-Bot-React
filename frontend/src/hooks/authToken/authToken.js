import axios from "axios";

// Create axios instance with base URL and default headers
const authToken = axios.create({
  baseURL: "http://localhost:7777",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default authToken;
