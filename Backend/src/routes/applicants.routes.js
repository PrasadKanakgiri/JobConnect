import {Router } from "express"
import { editProfile, loginApplicant, signupApplicant } from "../controllers/applicant.controller.js"
import { verifyJWT1 } from "../middlewares/auth.middleware.js"


const ApplicantRouter=Router()

ApplicantRouter.route("/register").post(signupApplicant)
ApplicantRouter.route("/login").post(loginApplicant)
ApplicantRouter.route("/edit").post(verifyJWT1, editProfile)

export {ApplicantRouter}