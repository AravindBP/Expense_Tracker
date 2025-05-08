const express=require('express');
const router=express.Router();
const { MongoClient }=require('mongodb');

const uri='mongodb://127.0.0.1:27017';
const client=new MongoClient(uri);

router.post('/',async (req,res)=>{
  let { username,password,confirmPassword }=req.body;

  username=username.trim();
  password=password.trim();
  confirmPassword=confirmPassword.trim();

  if (!username||!password||!confirmPassword) {
    return res.status(400).json({ success: false,error: "All fields are required." });
  }

  if (password!==confirmPassword) {
    return res.status(400).json({ success: false,error: "Passwords do not match." });
  }

  try {
    await client.connect();

    const db=client.db("Login"); 
    const collection=db.collection("Login"); 

    const existingUser=await collection.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ success: false,error: "Username already exists." });
    }

    await collection.insertOne({ username,password });
    return res.status(201).json({ success: true,message: "Registration successful!" });

  } catch (err) {
    return res.status(500).json({ success: false,error: "Server error. Try again later." });
  }
  finally {
    await client.close(); 
  }
});

module.exports=router;
