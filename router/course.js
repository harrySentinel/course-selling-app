const {Router} = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", (req,res)=>{
  res.json({
    message : "inside course router"
})
})

courseRouter.post("/preview", (req,res)=>{
    res.json({
        message : "inside course router"
    })   
})

module.exports = {
    courseRouter: courseRouter
};
