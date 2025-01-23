const {Router} = require("express");
const {adminModel, courseModel} = require("../db")
const adminRouter = Router();
const jwt = require("jsonwebtoken")
require('dotenv').config();
const bcrypt = require('bcrypt')
const {JWT_ADMIN_SECRET} = require("../config")
const {z} = require("zod")
const {adminMiddleware} = require("../middleware/admin")

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

adminRouter.post("/course", adminMiddleware, async (req,res) => {
    const adminId = req.userId;

    const {title, description, price, imageUrl} = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price, 
        imageUrl: imageUrl,
        creatorId: adminId
    })

    res.json({
        message : "course created successfully !!",
        courseId: course._id
    })
})
adminRouter.put("/course", adminMiddleware, async (req,res)=>{
    const adminId = req.userId

    const {title, description,imageUrl, price, courseId} =  req.body

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId        
    },{
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })

    res.json({
        message: "Course Updated successfully",
        courseId : course._id
    })
})

adminRouter.get("/course/bulk", async (req,res)=>{
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        message: "listing all your courses...",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}