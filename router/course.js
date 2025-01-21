const Router = require("express");

const courseRouter = express();

courseRouter.post("/course/purchase", (req,res)=>{
  res.json({
    message : "inside course router"
})
})

courseRouter.post("/course/preview", (req,res)=>{
    res.json({
        message : "inside course router"
    })   
})

module.exports({
    courseRouter: courseRouter
})