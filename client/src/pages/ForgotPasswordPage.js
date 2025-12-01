import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      setMessage("Reset link sent to your email.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Reset Link</button>
      <p>{message}</p>
    </div>
  );
}
