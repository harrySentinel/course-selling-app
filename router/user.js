const { Router } = require("express");
const userRouter = Router();
const jwt  = require("jsonwebtoken");
const {userModel} = require("../db")
require("dotenv").config()
const bcrypt = require("bcrypt");
const {JWT_USER_SECRET} = require("../config")
const {z} = require("zod")

userRouter.post("/signup", async (req,res)=>{

   // zod validation schema
   const signupSchema = z.object({
    email: z.string().min(3),
    password: z.string().min(6),
    firstName: z.string().min(1), // firstName cannot be empty
    lastName: z.string().min(1) // lastName cannot be empty
   });

try{

    // validating request body
   signupSchema.parse(req.body);

   const {email, password, firstName,lastName} = req.body;

 const user = await userModel.findOne({
    email
 })

 if(user){
    return res.status(400).json({
        message: "user already exist in the database"
    });
 }
   
 // hashing password
  const hashedPassword = await bcrypt.hash(password, 5);

  await userModel.create({
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName
  });

  // success message
  res.status(201).json({
    message : "The user signed up successfully"
  });   
} catch (error){
   if(error.errors){
    return res.status(400).json({
        message : "Invalid input",
        errors: error.errors.map((err) => err.message), // extracting readable error
    });
   }

   //handling any unexpected errors
   res.status(500).json({
    message : "An occured during signup"
   });
    }
}) 

userRouter.post("/signin", async (req,res)=>{
    const email = req.body.email
    const password  = req.body.password

    const user = await userModel.findOne({
        email: email
    });

    if(!user){
        return res.status(403).json({
            message: " the user does not exist"
        })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)

    if(passwordMatch){
        const token  = jwt.sign({
            id : user._id.toString()
        }, JWT_USER_SECRET);

        res.json({
            message : "the user is signed in",
            Token : token
        })
    }else{
       return res.status(403).json({
            message : "incorrect credentials"
        })
    }
}) 

userRouter.get("/purchases", (req,res)=>{
    res.json({
        message: "have to edit the routes"
       })
}) 

module.exports = {
    userRouter: userRouter
}