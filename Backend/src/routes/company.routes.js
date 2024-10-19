import {Router } from "express"
// import { editProfile, loginApplicant, signupApplicant } from "../controllers/applicant.controller.js"
import { verifyJWT1 } from "../middlewares/auth.middleware.js"
import { loginCompany, SignupCompany } from "../controllers/company.controller.js"
import { addQuestion, calculateScore, createTest } from "../controllers/test.controller.js"
import { createJobRole } from "../controllers/jobroles.controller.js"


const CompanyRouter=Router()

CompanyRouter.route("/register").post(SignupCompany)
CompanyRouter.route("/login").post(loginCompany)
CompanyRouter.route("/createTest").post(createTest)
CompanyRouter.route("/addquestion").post(addQuestion)
CompanyRouter.route("/createJobrole").post(verifyJWT1,createJobRole)
CompanyRouter.route("/calculatescore").post(verifyJWT1,calculateScore)
// CompanyRouter.route("/edit").post(verifyJWT1, editProfile)

export {CompanyRouter}