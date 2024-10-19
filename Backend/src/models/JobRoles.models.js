import mongoose, {Schema} from "mongoose"

const JobRolesSchema = new mongoose.Schema({
    companyname: {
        type : Schema.Types.ObjectId,
        ref : "Company"

    },
    RoleName : {
        type :String,
        required : true,
        unique : true
    },

    jobType : {    //  internships/fulltime
        type : String,
        required : true
    },
   
    method : { //hybrid/from home
        type :String,
        required : true,
        
    },

    Applicants : [
        {
            type: Schema.Types.ObjectId,
            ref: "Applicant"
        }
    ],

    openings : {
        type : Number,
        required : true
    },

    RequiredExperience : {
        type : Number,
        required : true
    },
    

   
        
    
})

export const JobRole = mongoose.model("JobRole",JobRolesSchema)