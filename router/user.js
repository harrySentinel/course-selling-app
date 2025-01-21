const { Router } = require("express");

const userRouter = Router();

userRouter.post("/user/signup", (req,res)=>{
   res.json({
    message: "have to edit the routes"
   })
}) 

userRouter.post("/user/signin", (req,res)=>{
    res.json({
        message: "have to edit the routes"
       })
}) 

userRouter.get("/user/purchases", (req,res)=>{
    res.json({
        message: "have to edit the routes"
       })
}) 

module.exports({
    userRouter: userRouter
})