// LogoutButton.jsx

import React from "react";
import axios from "axios";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:7777/admin/logout");
      // Assuming the logout API call was successful

      // Clear the token from localStorage
      localStorage.removeItem("token");

      onLogout(); // Notify parent component about successful logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error scenario if necessary
    }
  };

  return (
    <button
      style={{
        backgroundColor: "#d62d20",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        height: "40px",
        fontSize: "18px",
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
