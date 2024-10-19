import jwt from "jsonwebtoken"
import { Applicant } from "../models/Applicant.model.js";
import { Company } from "../models/Company.models.js";


const verifyJWT1 = async function(req, res, next) {
    try {
        const { accesstoken } = req.cookies;
        
        if (!accesstoken) {
            return res.status(401).json({ error: "Token is missing" });
        }

        let decoded;
        let user = null;

        try {
            
            decoded = jwt.verify(accesstoken, process.env.ACCESSTOKENONE);
            user = await Applicant.findById(decoded._id);
            req.type="Applicant"
        } catch (error) {
            
            decoded = jwt.verify(accesstoken, process.env.ACCESSTOKENTWO);
            user = await Company.findById(decoded._id);
            req.type="Company"
        }

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Invalid token or authentication failed" });
    }
};

export {verifyJWT1};