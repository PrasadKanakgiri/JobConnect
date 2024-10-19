import { Test } from "../models/Test.models.js"

const createTest = async function(req,res){
    try {

        const {TestName} = req.body

        const {jobrole} = req.cookies 

        // const jobRoleName = jobrole.RoleName;

        const test=await Test.create({
            TestName, jobrole
        })


        res.status(200)
        .cookie("testId",test._id)
        .json({message : "Test created successfully"})

        
    } catch (error) {
        console.log(error,"error while creating test");
        
    }
}

const addQuestion = async function(req,res){
    try {
        const {question , options, correctoption}=req.body

        const {testId}= req.cookies 
        const test=await Test.findById(testId)
 
       

        const questionObject = {
            question, options, optionNumber:correctoption
        }

        let arr=test.questions
        arr.push(questionObject)

        test.questions=arr;
        test.save()


        res.status(200)
        .json({message : "question added successfully"})
    } catch (error) {
        console.log(error,"error while creating question");
        
    }
}

const calculateScore = async function(req,res){
    try {

        const {ApplicantsOptions,ApplicantEmail} = req.body 

        const {testId}=req.cookies
        const currentTest=await Test.findById(testId)

        let score=0;


       let temparr= currentTest.questions

       temparr.map((ele,ind)=>{
         if(ele.optionNumber==ApplicantsOptions[ind]) score+=1;
       })

       let tempResults = currentTest.results

       tempResults.push({
        ApplicantEmail: ApplicantEmail,
        score: score
       }) 

       currentTest.results = tempResults

       currentTest.save()

       res.status(200)
       .json({message : "score calculated",currentTest})

        
    } catch (error) {
        console.log(error,"error while calculating score")
    }
}

export {createTest,addQuestion,calculateScore}