const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signup", (req,res)=>{
   res.json({
    message: "have to edit the routes"
   })
}) 

userRouter.post("/signin", (req,res)=>{
    res.json({
        message: "have to edit the routes"
       })
}) 

userRouter.get("/purchases", (req,res)=>{
    res.json({
        message: "have to edit the routes"
       })
}) 

module.exports = {
    userRouter: userRouter
}