import  { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
},
{
  timestamps: true,
});

// Encrypt password before saving
userSchema.pre("save", async function (next){
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
})


// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

// Generate jwt token
userSchema.methods.generateJwtToken = function (){
  return jwt.sign({
    id: this._id,
    email: this.email,
    name: this.name,
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}


const User = model("User", userSchema);
export default User;

