import React, { useState } from "react";
import './Reg.css';
import { Link, useNavigate } from "react-router-dom";

function Reg() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/reg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate("/"); // Redirect to login page
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="App">
      <h1 id="Rg">Register Page:</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="User" className="Lb">Username:</label><br /><br />
        <input
          type="text"
          name="User"
          className="In"
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br /><br />

        <label htmlFor="PW" className="Lb">Password:</label><br /><br />
        <input
          type="password"
          name="PW"
          className="In"
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br /><br />

        <label htmlFor="PW" className="Lb">Confirm Password:</label><br /><br />
        <input
          type="password"
          name="PW"
          className="In"
          onChange={(e) => setConfirmPassword(e.target.value)}
        /><br /><br /><br />

        <input type="button" value="Register" id="Log" onClick={handleRegister} /><br /><br />
        <p>If you already have an account, <Link to="/">Sign In</Link></p>
      </form>
    </div>
  );
}

export default Reg;
