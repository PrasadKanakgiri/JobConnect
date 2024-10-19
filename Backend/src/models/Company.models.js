import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const CompanySchema = new mongoose.Schema({
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
    location : {
        type :String,
        required : true,
        
    },

    Notifications : {
        type : [Object]
    },

    jobOpenings : [
        {
            type: Schema.Types.ObjectId,
            ref: "JobRole"
        }
    ],
});

CompanySchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

CompanySchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

CompanySchema.methods.generateAccessToken =  function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            
        },
        process.env.ACCESSTOKENTWO,
        {
            expiresIn: process.env.ACCESSTOKENTWOEXPIRY
        }
    )
}
CompanySchema.methods.generateRefreshToken =  function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESHTOKENTWO,
        {
            expiresIn: process.env.REFRESHTOKENTWOEXPIRY
        }
    )
}

export const Company = mongoose.model("Company",CompanySchema)