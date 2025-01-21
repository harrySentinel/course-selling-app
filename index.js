const express = require("express");
const {userRouter} = require("./router/user")
const {courseRouter} = require("./router/course");
const { adminRouter } = require("./router/admin");

const app = express();

app.use("user", userRouter);
app.use("course", courseRouter);
app.use("admin", adminRouter);

app.listen(3000);