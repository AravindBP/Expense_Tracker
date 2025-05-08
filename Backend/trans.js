const express=require('express');
const router=express()
const { MongoClient }=require('mongodb');

const uri='mongodb://127.0.0.1:27017';

router.post('/',async (req,res)=>{
  let { username,Amt,Exp,Dt,Desc,Md }=req.body;

  console.log("Received:",{ username,Amt,Exp,Dt,Desc,Md });

  if (!Amt || !Exp || !Dt || !Md) {
    console.log(" Missing required fields");
    return res.status(400).json({ success: false,error: "All fields except description are required." });
  }

  const client=new MongoClient(uri);

  try {
    await client.connect();
    console.log("MongoDB connected");

    const db=client.db("Login");
    const collection=db.collection("Transaction");

    const result=await collection.insertOne({
      username:username.trim(),
      Amt:parseFloat(Amt),
      Exp:Exp.trim(),
      Dt:Dt.trim(),
      Desc:Desc ? Desc.trim():"",
      Md:Md.trim()
    });
    res.status(200).json({ success: true,message: "Transaction added successfully" });

  } 
  catch (err) {
    res.status(500).json({ success: false,error: "Server error. Couldn't add the data." });
  } finally {
    await client.close();
  }
});

module.exports=router;
