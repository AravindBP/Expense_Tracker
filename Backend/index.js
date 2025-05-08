const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const userRoutes=require("./users");
const regRoutes=require('./reg');
const transRoutes=require('./trans');
const repRoutes=require("./rep");
const homRoutes=require("./home");
const app=express();
const PORT=5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.use("/login", userRoutes);
app.use("/reg",regRoutes);
app.use("/trans",transRoutes);
app.use("/rep",repRoutes);
app.use("/home",homRoutes);

app.listen(PORT,() =>{
  console.log(`Server running at http://localhost:${PORT}`);
});
