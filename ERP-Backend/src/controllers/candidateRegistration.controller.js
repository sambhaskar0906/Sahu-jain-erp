import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CandidateRegistration } from "../models/candidateRegistration.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registration = asyncHandler(async (req, res) => {
  try {
    const { email, password, dob, verificationCode } = req.body;
    if (!email || !password || !dob || !verificationCode) {
      throw new ApiError(500, "All fields are required");
    }

    const existingUser = await CandidateRegistration.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email already registered");
    }


    const candidate = await CandidateRegistration.create(
      {
        email,
        password,
        dob,
        verificationCode,
        verificationExpiryTime: new Date(Date.now() + 10 * 60 * 1000),
      }
    )
    await sendEmail({
      to: email,
      subject: "🎉 Registration Successful - Your Application ID Inside!",
      text: `Thank you for registering. Your Application ID is: ${candidate.applicationId}`,
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f0f4f8; border-radius: 10px; border: 1px solid #ccc;">
      <h2 style="color: #1a237e; text-align: center;">🎓 Welcome to Sahu Jain College ERP Portal</h2>
      
      <p style="font-size: 16px; color: #2c3e50;">
        Dear Candidate,
      </p>
      
      <p style="font-size: 16px; color: #2c3e50;">
        We are thrilled to inform you that your registration has been <strong>successfully completed</strong> on the 
        <strong>Sahu Jain College ERP Portal</strong>.
      </p>

      <div style="margin: 20px 0; padding: 15px; background-color: #e8f0fe; border-left: 5px solid #1a73e8; border-radius: 8px;">
        <p style="font-size: 16px; color: #1a237e; font-weight: bold;">
          🎫 Your Application ID:
          <span style="font-size: 18px; color: #d32f2f;">${candidate.applicationId}</span>
        </p>
      </div>

      <p style="font-size: 15px; color: #444;">
        Please use this Application ID along with your password to login to your dashboard, where you can complete your profile, upload documents, and monitor your application status.
      </p>

      <br/>

      <p style="font-size: 14px; color: #999;">
        Best Regards,<br/>
        <strong>Sahu Jain College ERP Team</strong><br/>
        <em>Empowering Education Through Technology</em>
      </p>
    </div>
  `
    });


    res.status(201)
      .json(new ApiResponse(201, {
        applicationId: candidate.applicationId,
        candidate,
      }, "Candidate Registered Successfully"));


  }
  catch (err) {
    console.log("error", err.message);
    throw new ApiError(500, "Error occurred during registration");
  }



})

export const loginCandidate = asyncHandler(async (req, res) => {
  const { applicationId, password } = req.body;

  if (!applicationId || !password) {
    throw new ApiError(400, "Application ID and password are required");
  }

  const candidate = await CandidateRegistration.findOne({ applicationId });
  if (!candidate) {
    throw new ApiError(404, "Candidate not found with this application");
  }


  const isPasswordValid = await bcrypt.compare(password, candidate.password);

  if (!isPasswordValid) {

    throw new ApiError(401, "Invalid Application ID or Password");

  }

  const token = jwt.sign(
    {
      id: candidate._id,
      applicationId: candidate.applicationId,
      email: candidate.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 12 * 60 * 60 * 1000
    })
    .status(200)
    .json(new ApiResponse(201, {
      token,
      user: {
        userId: candidate._id,
        applicationId: candidate.applicationId,
        email: candidate.email,
      },
    },
      "Login Successful"));

})
