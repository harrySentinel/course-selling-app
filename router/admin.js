const {Router} = require("express");
const {adminModel} = require("../db")
const adminRouter = Router();
const jwt = require("jsonwebtoken")
require('dotenv').config();
const bcrypt = require('bcrypt')
const JWT_SECRET = process.env.JWT_SECRET;

adminRouter.post("/signup", async (req,res)=>{
const email = req.body.email;
const password = req.body.password;
const firstName = req.body.firstName;
const lastName =  req.body.lastName;

let errorThrown = false;
try{
 const hashedPassword = await bcrypt.hash(password, 5)
 
 await adminModel.create({
    email : email, 
    password: hashedPassword,
    firstName: firstName,
    lastName : lastName
 })

}catch(error){
res.json({
    message : "user already exists"
})
 errorThrown = true;
}

if(!errorThrown){
    res.json({
        message : "you are signed up"
    })
}
})

adminRouter.post("/signin", async (req,res)=>{
 const email = req.body.email;
 const password = req.body.password;
 
 const response = await adminModel.findOne({
    email: email
 })
 console.log(response)

 if(!response){
    return res.status(403).json({
        message: "user does not exists in our database"
    })
 }
    const passwordMatch = bcrypt.compare(password, response.password)

    if(passwordMatch){
        const token = jwt.sign({
            id: response._id.toString() // because reponse._id is a ObjectId 
        },JWT_SECRET)
    }else {
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
 
})

adminRouter.post("/course", (req,res)=>{
    res.json({
        message: "course endpoint"
    })
})

adminRouter.put("/course", (req,res)=>{
    res.json({
        message: "course put endpoint"
    })
})

adminRouter.get("/course/bulk", (req,res)=>{
    res.json({
        message: "retreiving course endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}