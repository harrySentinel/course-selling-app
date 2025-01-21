const express = require("express");
const mongoose = require("mongoose")
const {userRouter} = require("./router/user")
const {courseRouter} = require("./router/course");
const { adminRouter } = require("./router/admin");

const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);


async function main(){
   await mongoose.connect("mongodb+srv://harry785:5nqma4KTGtdXnp3Q@cluster0.amtk9.mongodb.net/course-selling-app");
   app.listen(3000);
   console.log("server is listening on port 3000")
}

main();