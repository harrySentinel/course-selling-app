const {Router} = require("express");
const {adminModel} = require("../db")

const adminRouter = Router();

adminRouter.post("/signup", (req,res)=>{
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post("/signin", (req,res)=>{
    res.json({
        message: "signin endpoint"
    })
})

adminRouter.post("/", (req,res)=>{
    res.json({
        message: "course endpoint"
    })
})

adminRouter.put("/", (req,res)=>{
    res.json({
        message: "course put endpoint"
    })
})

adminRouter.get("/bulk", (req,res)=>{
    res.json({
        message: "retreiving course endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}