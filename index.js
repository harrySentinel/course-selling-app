const express = require("express");
const {userRouter} = require("./router/user")
const {courseRouter} = require("./router/course")

const app = express();

app.use("user", userRouter);
app.use("course", courseRouter)

app.listen(3000);