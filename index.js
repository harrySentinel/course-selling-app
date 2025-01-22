const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config();
const {userRouter} = require("./router/user")
const {courseRouter} = require("./router/course");
const { adminRouter } = require("./router/admin");

const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);


async function main(){
   try{
   const MONGO_URI = process.env.MONGO_URI;
   const PORT = process.env.PORT || 3000;

   await mongoose.connect(MONGO_URI)
    console.log("connected to MONGODB successfully !")

    // starting the server 
    app.listen(PORT, ()=>{
      console.log(`the server is listening on PORT ${PORT}`)
    })

   } catch(error){
      console.error("Error Starting the application:", error.message)
      process.exit(1);
   }
}

main();