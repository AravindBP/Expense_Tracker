import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const NAV=useNavigate();
    const [total, setTotal]=useState(0);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState(null);
    const username=localStorage.getItem('username');
    useEffect(()=>{
        const fetchTotal=async ()=>{
            try {
                const res=await fetch(`http://localhost:5000/home?username=${username}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data=await res.json();
                setTotal(data.total || 0);
            } catch (err) {
                console.error(err);
                setError("Could not load total.");
            } finally {
                setLoading(false);
            }
        };
        fetchTotal();
    }, [username]);
    return (
        <div id="cont">
            <nav>
                <Link to="/Home" className="navcom">Home</Link>&nbsp;&nbsp;
                <Link to="/Rep" className="navcom">View_Report</Link>&nbsp;&nbsp;
                <Link to="/Trans" className="navcom">Transaction</Link>&nbsp;&nbsp;
                <Link to="/About" className="navcom">About</Link>&nbsp;&nbsp;
                <Link to="/" className="navcom" onClick={()=>{localStorage.removeItem("username");}}>Logout</Link>&nbsp;&nbsp;
            </nav><br /><br />

            <div>
                <h1 className="Atr">Total Amount Spent this month:</h1><br /><br />
                <h1 id="AmtSpt">{loading ? "Loading..." : `₹${total}`}</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button className="btn" onClick={()=>NAV("/Trans")}>+ Add Expense</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" onClick={()=> NAV("/Rep")}>Check Report</button>
            </div>
        </div>
    );
}

export default Home;
