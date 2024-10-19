import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApplicantRouter } from './routes/applicants.routes.js';
import { CompanyRouter } from './routes/company.routes.js';



const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN, // This should be 'http://localhost:3000'
    credentials: true,               // Allow credentials (cookies, etc.)
}));

app.use(express.json(({limit:"16kb"}))) // this is used to accpept data in json format 
app.use(express.urlencoded({extended: true, limit:"16kb"}))  // this is used to accept data in url format
app.use(express.static("public"))  // this is used to store files in image, pdf format
app.use(cookieParser({}))

app.use("/api/v1/applicant",ApplicantRouter)
app.use("/api/v1/company",CompanyRouter)



export {app}