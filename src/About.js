import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
function About(){
    return(
        <div class="con">
            <nav>
                <Link to="/Home" class="navcom">Home</Link>&nbsp;&nbsp;
                <Link to="/Rep" class="navcom">View_Report</Link>&nbsp;&nbsp;
                <Link to="/Trans" class="navcom">Transaction</Link>&nbsp;&nbsp;
                <Link to="/About" class="navcom">About</Link>&nbsp;&nbsp;
                <Link to="/" class="navcom" onClick={()=>{localStorage.removeItem("username");}}>Logout</Link>&nbsp;&nbsp;
            </nav><br/><br/>
            <h1 id="bat">About:</h1><br/>
            <p id="rabt">Welcome to Spending Tracker, your go-to solution for managing daily expenses with ease! Whether you want to track your spending habits, stay within a budget, or simply keep a record of where your money goes, this app helps you stay in control</p>
            <h2 class="AHd">How It Works</h2>
            <ol class="Li">
                <li>Add Your Expenses–Enter the amount, category, and date in just a few clicks.</li>
                <li>View & Manage Transactions–Easily track and edit your past expenses.</li>
                <li>Stay on Top of Your Spending–Get a clear picture of your financial habits over time.</li>
            </ol><br/><br/>
            <h2 class="AHd">Who Is This App For?</h2>
            <ul class="Li">
                <li>Students managing daily allowances.</li>
                <li>Professionals keeping track of monthly expenses.</li>
                <li>Anyone who wants to improve financial discipline and avoid overspending.</li>
            </ul>
        </div>
    );
    
}
export default About;