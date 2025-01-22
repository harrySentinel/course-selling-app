const {Router} = require("express");
const {adminModel} = require("../db")
const adminRouter = Router();
const jwt = require("jsonwebtoken")
require('dotenv').config();
const bcrypt = require('bcrypt')
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const {z} = require("zod")

adminRouter.post("/signup", async (req,res)=>{
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

 const admin = await adminModel.findOne({
    email
 })

 if(admin){
    return res.status(400).json({
        message: "user already exist in the database"
    });
 }
   
 // hashing password
  const hashedPassword = await bcrypt.hash(password, 5);

  await adminModel.create({
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName
  });

  // success message
  res.status(201).json({
    message : "The admin signed up successfully"
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

adminRouter.post("/signin", async (req,res)=>{
    const email = req.body.email
    const password  = req.body.password

    const admin = await adminModel.findOne({
        email: email
    });

    if(!admin){
        return res.status(403).json({
            message: " the admin does not exist"
        })
    }
    const passwordMatch = await bcrypt.compare(password, admin.password)

    if(passwordMatch){
        const token  = jwt.sign({
            id : admin._id.toString()
        }, JWT_ADMIN_SECRET);

        res.json({
            message : "the admin is signed up",
            Token : token
        })
    }else{
       return res.status(403).json({
            message : "incorrect credentials"
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