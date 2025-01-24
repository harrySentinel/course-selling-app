const {Router} = require("express");
const courseRouter = Router();
const {userMiddleware} = require("../middleware/user");
const {purchaseModel, courseModel} = require("../db")

courseRouter.post("/purchase", userMiddleware, async (req,res)=>{
        const userId = req.userId;
        const courseId = req.body.courseId;
        
        await purchaseModel.create({
           userId,
           courseId
        })
        res.json({
            message: "You have successfully bought the course"
        })
})

courseRouter.get("/preview", async (req,res)=>{
    const courses = await courseModel.find({})

    res.json({
        courses
    })   
})

module.exports = {
    courseRouter: courseRouter
};
