const express=require('express');
const router=express.Router();
const { MongoClient }=require('mongodb');

const uri='mongodb://127.0.0.1:27017';
const client=new MongoClient(uri);

router.post('/',async (req,res)=>{
  let { username,password }=req.body;

  username=username.trim();
  password=password.trim();

  try {
    await client.connect();
    const database=client.db('Login');
    const collection=database.collection('Login');

    const user=await collection.findOne({ username,password });

    if (user) {
      return res.status(200).json({ success: true,message: 'Login successful' });
    } else {
      return res.status(401).json({ success: false,error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ success: false,error: 'Server error. Please try again later.' });
  }
  finally {
    await client.close();
  }
});

module.exports=router;
