import './Log.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

function Log() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({username,password}),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Login successful!");
        localStorage.setItem("username",username);
        navigate("/Home");
      } else {
        alert(data.error||"Invalid username or password.");
      }
    } catch (err) {
      alert("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="App">
      <h1 id="Lg">Login Page</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="User" className="Lb">Username:</label><br /><br />
        <input
          type="text"
          name="User"
          className="In"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br /><br /><br />

        <label htmlFor="PW" className="Lb">Password:</label><br /><br />
        <input
          type="password"
          name="PW"
          className="In"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br /><br /><br />

        <input type="button" value="Login" id="Log" onClick={handleLogin} /><br /><br /><br />

        <p>If you don't have an account, <Link to="/Reg">Register here</Link></p>
      </form>
    </div>
  );
}

export default Log;
