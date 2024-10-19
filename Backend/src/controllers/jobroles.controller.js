import { JobRole } from "../models/JobRoles.models.js";
const createJobRole = async function (req, res) {
  try {
    const {
      RoleName,
      jobType,
      method,
      openings,
      RequiredExperience,
    } = req.body;

    const currentCompany = req.user


    const jobrole = await JobRole.create({
        RoleName,
        jobType,
        method,
        openings,
        RequiredExperience,
        companyname : currentCompany

    })

    res.status(200)
    .cookie("jobrole",jobrole)
    .json({message: "jobrole created successfully", jobrole})

  } catch (error) {
    console.log(error,"error while creating job role");
    
  }
};

export {createJobRole}
