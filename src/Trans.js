import React from "react";
import "./Trans.css";
import { Link, useNavigate } from "react-router-dom";

const Trans = () => {
  const handleAdd = async () => {
    const Amt = document.getElementById("Amt").value;
    const Exp = document.getElementById("Cat").value;
    const Dt = document.getElementById("Dt").value;
    const Desc = document.getElementById("Desc").value;
    const Md = document.getElementById("Md").value;

    const username = localStorage.getItem("username");
    if (!username) {
      alert("User not logged in. Please login again.");
      return;
    }

    if (!Amt || !Exp || !Dt || !Md) {
      alert("Please fill all fields except description.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/trans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, Amt, Exp, Dt, Desc, Md }), // ✅ include username
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Transaction added successfully!");
        document.getElementById("TranCon").reset();
      } else {
        alert(data.error || "Failed to add transaction.");
      }
    } catch (err) {
      alert("Server error. Please try again later.");
      console.log(err);
    }
  };
  return (
    <div className="container">
      <nav>
        <Link to="/Home" className="navcom">Home</Link>&nbsp;&nbsp;
        <Link to="/Rep" className="navcom">View_Report</Link>&nbsp;&nbsp;
        <Link to="/Trans" className="navcom">Transaction</Link>&nbsp;&nbsp;
        <Link to="/About" className="navcom">About</Link>&nbsp;&nbsp;
        <Link to="/" className="navcom" onClick={()=>{localStorage.removeItem("username");}}>Logout</Link>&nbsp;&nbsp;
      </nav><br /><br />
      <form id="TranCon">
        <label htmlFor="Amt" className="Lbin">Amount:</label>
        <input type="number" name="Amt" id="Amt" placeholder="Amount" /><br /><br />
        <label htmlFor="Cat" className="Lbin">Expense for:</label>
        <input type="text" name="Cat" id="Cat" /><br /><br />
        <label htmlFor="Dt" className="Lbin">Date:</label>
        <input type="date" name="Dt" id="Dt" /><br /><br />
        <label htmlFor="Desc" className="Lbin">Description</label>
        <input type="text" name="Desc" id="Desc" placeholder="optional" /><br /><br />
        <label htmlFor="Md" className="Lbin">Mode:</label>
        <select name="Md" id="Md">
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Others">Others</option>
        </select><br /><br /><br />
        <button type="button" id="Add" onClick={handleAdd}>Add</button>
      </form>
    </div>
  );
};

export default Trans;
