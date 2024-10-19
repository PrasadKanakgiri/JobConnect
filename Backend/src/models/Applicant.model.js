import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const ApplicantSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true,
        unique : true
    },
    email : {
        type :String,
        required : true,
        unique : true
    },
    password : {
        type :String,
        required : true,
       
    },
    CollegeName : {
        type :String,
        
        
        
    },
    LikedinUrl : {
        type :String,
        
        
    },
    Cgpa : {
        type :String,
        
        
    },
    Bio : {
        type :String,
        
        
    },

    Notifications : {
        type : [String]
    },

    skills : {
        type : [String]
    },

    
})

ApplicantSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

ApplicantSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

ApplicantSchema.methods.generateAccessToken =  function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            
        },
        process.env.ACCESSTOKENONE,
        {
            expiresIn: process.env.ACCESSTOKENONEEXPIRY
        }
    )
}
ApplicantSchema.methods.generateRefreshToken =  function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESHTOKENONE,
        {
            expiresIn: process.env.REFRESHTOKENONEEXPIRY
        }
    )
}

export const Applicant = mongoose.model("Applicant",ApplicantSchema)