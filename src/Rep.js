import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Rep.css"
function Rep() {
    const [monthlyData, setMonthlyData]=useState([]);
    const [selectedMonth, setSelectedMonth]=useState("");
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState(null);
    const [selectedFilter, setSelectedFilter]=useState("all");
    const username=localStorage.getItem('username');
    useEffect(() => {
        const fetchTransactions=async () => {
            setLoading(true);
            try {
                const response=await fetch(`http://localhost:5000/rep?username=${username}&filter=${selectedFilter}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status:${response.status}`);
                }
                const data=await response.json();
                setMonthlyData(data);
                if (data.length > 0) {
                    setMonthlyData(data);
                    setSelectedMonth("all");
                } 
                else {
                    setMonthlyData([]);
                    setSelectedMonth("");
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [selectedFilter]);

    const handleMonthChange=(e)=>setSelectedMonth(e.target.value);
    const handleFilterChange=(e)=>setSelectedFilter(e.target.value);

    if (loading) return <div className="container"><p>Loading transactions...</p></div>;
    if (error) return <div className="container"><p>Error:{error.message}</p></div>;

    const selectedData={ transactions:monthlyData.flatMap(m => m.transactions) };
    return (
        <div className="container">
            <nav>
                <Link to="/Home" className="navcom">Home</Link>&nbsp;&nbsp;
                <Link to="/Rep" className="navcom">View_Report</Link>&nbsp;&nbsp;
                <Link to="/Trans" className="navcom">Transaction</Link>&nbsp;&nbsp;
                <Link to="/About" className="navcom">About</Link>&nbsp;&nbsp;
                <Link to="/" className="navcom" onClick={()=>{localStorage.removeItem("username");}}>Logout</Link>&nbsp;&nbsp;
            </nav><br /><br />

            <label for="filter" id='fillab'>Filter:</label>
            <select value={selectedFilter} onChange={handleFilterChange} id="filter">
                <option value="all">All</option>
                <option value="1w">1 Week</option>
                <option value="2w">2 Weeks</option>
                <option value="1m">1 Month</option>
                <option value="2m">2 Months</option>
                <option value="4m">4 Months</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
            </select>
        <table border="3px solid white" id="tab">
        <thead>
            <tr className='Header'>
                <th>Amount</th>
                <th>Expense for</th>
                <th>Date</th>
                <th>Description</th>
                <th>Mode</th>
            </tr>
        </thead>
        <tbody>
            {selectedData && selectedData.transactions.map((transaction)=>(
                <tr key={transaction._id} className='Vals'>
                    <td>{transaction.Amt}</td>
                    <td>{transaction.Exp}</td>
                    <td>{transaction.Dt}</td>
                    <td>{transaction.Desc}</td>
                    <td>{transaction.Md}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    );
}

export default Rep;
