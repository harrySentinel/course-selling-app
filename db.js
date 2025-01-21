 const mongoose =  require("mongoose")

 console.log("connected to")
 mongoose.connect("");
 
 const schema  = mongoose.Schema;
 const ObjectId  = mongoose.Types.ObjectId

 const userSchema = new Schema({
  email : {type: String, unique: true},
  password : String,
  firstName : String, 
  lastname : String
 })

 const adminSchema = new schema({
   email : {type: String, unique: true},
   password : String, 
   firstname : String, 
   lastname : String
 })

 const courseSchema = new schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId : ObjectId
 })

 const purchaseSchema = new schema({
    courseId: ObjectId,
    userId : ObjectId
 })

 const userModel = mongoose.model("user", userSchema );
 const adminModel = mongoose.model("admin", adminSchema);
 const courseModel = mongoose.model("course", courseSchema);
 const purchaseModel = mongoose.model("purchase", purchaseSchema); 

 module.exports = {
    userModel,
    adminModel,
    courseModel, 
    purchaseModel
 }