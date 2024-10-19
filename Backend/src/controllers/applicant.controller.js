import { Applicant } from "../models/Applicant.model.js";

const generateTokens = async function (userId) {
  try {
    const user = await Applicant.findById(userId);

    if (!user) {
      throw new Error("user not exist");
    }

    const accesstoken = await user.generateAccessToken(); // Correct capitalization here
    const refreshtoken = await user.generateRefreshToken();

    return { accesstoken, refreshtoken };
  } catch (error) {
    console.log(error);
  }
};

const signupApplicant = async function (req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Some fields are miising");
    }

    const user = await Applicant.findOne({
      email,
    });

    if (user) {
      throw new Error("user with this email already exist");
    }

    const ApplicantUser = await Applicant.create({
      name,
      email,
      password,
    });

    if (!ApplicantUser) {
      throw new Error("problem while creating account");
    }

    const { accesstoken, refreshtoken } = await generateTokens(
      ApplicantUser._id
    );

    if (!accesstoken || !refreshtoken) {
      throw new Error("Error generating tokens");
    }

    res
      .cookie("accesstoken", accesstoken)
      .cookie("refreshtoken", refreshtoken)
      .status(200)
      .json({ status: true, type: "Applicant", user: ApplicantUser });
  } catch (error) {
    console.log(error);
  }
};
const loginApplicant = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Some fields are miising");
    }

    const user = await Applicant.findOne({
      email,
    });

    const isPasscorrect = await user.isPasswordCorrect(password);

    if (!isPasscorrect) {
      throw new Error("password is incorrect");
    }

    if (!user) {
      throw new Error("user with this email not exist");
    }

    const { accesstoken, refreshtoken } = await generateTokens(user._id);

    if (!accesstoken || !refreshtoken) {
      throw new Error("Error generating tokens");
    }

    res
      .cookie("accesstoken", accesstoken)
      .cookie("refreshtoken", refreshtoken)
      .status(200)
      .json({ status: true, type: "Applicant", user: user });
  } catch (error) {
    console.log(error);
  }
};

const editProfile = async function (req, res) {
  try {
    const { CollegeName="", LikedinUrl="", Cgpa="", Bio="", skills=[] } = req.body;

    console.log(CollegeName)

    const currentApplicant = req.user

    await Applicant.findByIdAndUpdate(currentApplicant._id,{
        CollegeName, LikedinUrl, Cgpa,Bio, ...skills
    })

    // Applicant.save()
    currentApplicant.save()

    console.log(CollegeName)


    res.status(200)
    .json({status:true, message: "Applicant updates successfully",currentApplicant})



  } catch (error) { //
    console.log(error,"error whilw updating applicant")
  }
};



export { signupApplicant, loginApplicant,editProfile };
