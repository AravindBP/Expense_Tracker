const express=require('express');
const { MongoClient }=require('mongodb');
const router=express.Router();

const uri='mongodb://127.0.0.1:27017';

function getDateCutoff(filter) {
    const now=new Date();
    const date=new Date(now);

    switch (filter) {
        case '1w':
            date.setDate(now.getDate()-7);
            break;
        case '2w':
            date.setDate(now.getDate()-14);
            break;
        case '1m':
            date.setMonth(now.getMonth()-1);
            break;
        case '2m':
            date.setMonth(now.getMonth()-2);
            break;
        case '4m':
            date.setMonth(now.getMonth()-4);
            break;
        case '6m':
            date.setMonth(now.getMonth()-6);
            break;
        case '1y':
            date.setFullYear(now.getFullYear()-1);
            break;
        case 'all':
            return null;
    }

    return date;
}

router.get('/',async (req,res)=>{
    const { username,filter }=req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username required' });
    }
    const dateCutoff=getDateCutoff(filter);

    const client=new MongoClient(uri);
    try {
        await client.connect();
        const db=client.db("Login");
        const collection=db.collection("Transaction");

        const dateCutoff=getDateCutoff(filter);
        const now=new Date();

    const query={
        username: username.trim(),
        ...(dateCutoff&&{ Dt: { $gte: dateCutoff.toISOString().slice(0,10) } })
        };

        const transactions=await collection.find(query).sort({ Dt: -1 }).toArray();
        // Group by Month-Year (for dropdown)
        const grouped=transactions.reduce((acc,trans)=>{
            const dt=new Date(trans.Dt); // Make sure Dt is a Date
            const label=`${String(dt.getMonth() + 1).padStart(2,'0')}-${dt.getFullYear()}`;
            if (!acc[label]) acc[label]=[];
            acc[label].push(trans);
            return acc;
        },{});

        const responseData=Object.entries(grouped).map(([label,trans])=>({
            _id: label,
            transactions: trans
        }));

        res.json(responseData);
    } catch (err) {
        res.status(500).json({ error: 'Failed to group transactions' });
    } finally {
        await client.close();
    }
});

module.exports=router;
