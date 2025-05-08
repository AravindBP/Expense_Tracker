const express=require("express");
const { MongoClient }=require("mongodb");
const router=express.Router();

const uri='mongodb://127.0.0.1:27017';

router.get("/",async (req,res)=>{
    const { username }=req.query;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    const now=new Date();
    const currentMonth=String(now.getMonth() + 1).padStart(2,'0');
    const currentYear=now.getFullYear();
    
    const client=new MongoClient(uri);
    try {
        await client.connect();
        const db=client.db("Login");
        const collection=db.collection("Transaction");

        const userTransactions=await collection.find({
            username: username.trim(),
            Dt: { $regex: `^${currentYear}-${currentMonth}` }  // Format: YYYY-MM
        }).toArray();

        const total=userTransactions.reduce((sum,txn)=>sum + parseFloat(txn.Amt || 0),0);
        res.json({ total });
    } catch (err) {
        console.error("Error fetching monthly total:",err);
        res.status(500).json({ error: "Failed to fetch total" });
    } finally {
        await client.close();
    }
});

module.exports=router;
