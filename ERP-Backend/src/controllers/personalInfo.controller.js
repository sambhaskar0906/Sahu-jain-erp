import { asyncHandler } from "../utils/asyncHandler.js";
import { personalInfo } from "../models/personalInformation.model.js";
import { AcademicInfo } from "../models/academicInfo.model.js";
import { Subjects } from "../models/subjectInfo.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CandidateRegistration } from "../models/candidateRegistration.model.js"
import { sendEmail } from "../utils/sendEmail.js";
import path from "path";

export const registerPersonalInfo = asyncHandler(async (req, res) => {
  console.log("req", req.body);
  console.log("files", req.files);

  const userId = req.user?._id;

  const candidate = await CandidateRegistration.findById(userId);
  if (!candidate) {
    throw new ApiError(404, "Candidate not found");
  }

  const applicationId = candidate.applicationId;

  const {
    firstName,
    middleName,
    lastName,
    email,
    mobileNumber,
    whatsappNumber,
    dob,
    gender,
    nationality,
    caste,
    specialCategory,
    religion,
    aadharNumber,
    voterId,
    weightageClaimed,
    Paddress,
    Pcity,
    Pstate,
    Ppin,
    Taddress,
    Tcity,
    Tstate,
    Tpin,
    fathersName,
    mothersName,
    parentsMobile,
    verificationCode,
    maritalStatus,
    UniversityRegNum,
    UniversityEnrNum
  } = req.body;

  if (!req.files?.candidate_photo || !req.files?.candidate_signature) {
    throw new ApiError(400, "Photo and Signature are required");
  }

  const candidatePhotoPath = path.resolve(req.files.candidate_photo[0].path);
  const candidateSignaturePath = path.resolve(req.files.candidate_signature[0].path);

  const [photoUpload, signatureUpload] = await Promise.all([
    uploadOnCloudinary(candidatePhotoPath),
    uploadOnCloudinary(candidateSignaturePath),
  ]);


  if (!photoUpload || !signatureUpload) {
    throw new ApiError(500, "Failed to upload image(s) to Cloudinary");
  }

  const personalData = await personalInfo.create({
    _id: userId,
    applicationId,
    firstName,
    middleName,
    lastName,
    email,
    mobileNumber,
    whatsappNumber,
    dob,
    gender,
    nationality,
    caste,
    maritalStatus,
    UniversityRegNum,
    UniversityEnrNum,
    specialCategory,
    religion,
    aadharNumber,
    voterId,
    weightageClaimed,
    permanentAddress: {
      Paddress,
      Pcity,
      Pstate,
      Ppin,
    },
    temporaryAddress: {
      Taddress,
      Tcity,
      Tstate,
      Tpin,
    },
    fathersName,
    mothersName,
    parentsMobile,
    verificationCode,
    candidate_photo: photoUpload.secure_url,
    candidate_signature: signatureUpload.secure_url,
  });

  res.status(201).json(
    new ApiResponse(201, { personalData, applicationId }, "Personal info saved successfully")
  );
});

export const registerAcademicInfo = asyncHandler(async (req, res) => {
  const userId = req.user?._id;


  if (!userId) {
    throw new ApiError(401, "Unauthorized: user not logged in");
  }


  const academicRecords = req.body.academicRecords;

  if (!Array.isArray(academicRecords) || academicRecords.length === 0) {
    throw new ApiError(400, "Academic records are required.");
  }

  // 🔹 Fetch applicationId from personalInfo
  const user = await personalInfo.findById(userId);
  if (!user) {
    throw new ApiError(404, "User personal info not found");
  }

  const applicationId = user.applicationId;
  if (!applicationId) {
    throw new ApiError(400, "Application number missing in personal info");
  }

  // 🔹 Save academic info
  const academicData = await AcademicInfo.create({
    userId,
    academicRecords: academicRecords.map((record) => ({
      level: record.level,
      board: record.board,
      subject: record.subject,
      yearOfPassing: record.yearOfPassing,
      scoreType: record.scoreType,
      marksObtained:
        record.scoreType === "Percentage" ? record.marksObtained : undefined,
      maximumMarks:
        record.scoreType === "Percentage" ? record.maximumMarks : undefined,
      percentage:
        record.scoreType === "Percentage" ? record.percentage : undefined,
      cgpa: record.scoreType === "CGPA" ? record.cgpa : undefined,
      applicationId, // ✅ attach here
    })),
  });

  res.status(201).json(
    new ApiResponse(201, academicData, "Academic info saved successfully.")
  );
});

export const registerSubjectInfo = asyncHandler(async (req, res) => {
  const { semester, majorSubject, minorSubject } = req.body;

  if (!semester) {
    return res.status(400).json({ message: 'Semester is required' });
  }

  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized: user not logged in");
  }

  const user = await personalInfo.findOne({ _id: userId });
  if (!user) throw new ApiError(404, "User personal info not found");

  const subjectData = await Subjects.create({
    userId,
    applicationId: user.applicationId,
    majorSubject,
    minorSubject,
    semester
  });

  res
    .status(201)
    .json(new ApiResponse(201, subjectData, "Subject info saved successfully."));
});

export const submitFinalApplication = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const candidate = await CandidateRegistration.findById(userId);
  if (!candidate) throw new ApiError(404, "Candidate not found");

  const applicationId = candidate.applicationId;

  const [personal, academic, subject] = await Promise.all([
    personalInfo.findOne({ _id: userId }),
    AcademicInfo.findOne({ userId }),
    Subjects.findOne({ userId }),
  ]);

  if (!personal || !academic || !subject) {
    throw new ApiError(400, "All steps must be completed before final submission");
  }

  candidate.isSubmitted = true;
  await candidate.save();

  const fullName = `${personal.firstName} ${personal.middleName || ""} ${personal.lastName}`.trim();

  await sendEmail({
    to: candidate.email,
    subject: "✅ Application Submitted Successfully - Your Details Inside!",
    text: `Dear ${fullName}, your application (ID: ${applicationId}) has been successfully submitted.`,
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background-color: #f9fbfc; border-radius: 12px; border: 1px solid #e0e0e0;">
      <h2 style="color: #1a237e; text-align: center; margin-bottom: 10px;">✅ Application Submitted Successfully</h2>
      <p style="font-size: 16px; color: #2c3e50; text-align: center;">Thank you for completing your application with <strong>Sahu Jain College ERP</strong>.</p>

      <div style="margin: 30px auto; padding: 20px; background-color: #e3f2fd; border-left: 6px solid #1a73e8; border-radius: 10px; max-width: 400px;">
        <p style="font-size: 16px; color: #0d47a1; font-weight: bold; margin: 0;">
          📄 Application ID:
        </p>
        <p style="font-size: 20px; color: #d32f2f; margin: 5px 0 0 0;"><strong>${applicationId}</strong></p>
      </div>

      <p style="font-size: 15px; color: #333; margin-top: 25px;">
        Dear <strong>${fullName}</strong>,<br/><br/>
        We have successfully received your application. Our admissions team will now review your information. You will be notified via email about the next steps.
      </p>

      <p style="font-size: 15px; color: #333;">
        You can log in anytime using your Application ID and password to:
        <ul style="margin: 10px 0 20px 20px; color: #2c3e50; font-size: 15px;">
          <li>Complete or update your profile</li>
          <li>Upload required documents</li>
          <li>Track your application status</li>
        </ul>
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />

      <p style="font-size: 13px; color: #666; text-align: center;">
        Best Wishes,<br/>
        <strong>Sahu Jain College ERP Team</strong><br/>
        <em>Empowering Education Through Technology</em>
      </p>
    </div>
  `,
  });

  res.status(200).json(
    new ApiResponse(200, { applicationId }, "Application submitted successfully")
  );
});

export const traceApplicationStatus = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;

  if (!applicationId) {
    throw new ApiError(400, "Application number is required");
  }

  const candidate = await CandidateRegistration.findOne({ applicationId });
  if (!candidate) throw new ApiError(404, "No candidate found");

  const [personal, academic, subject] = await Promise.all([
    personalInfo.findOne({ applicationId }),
    AcademicInfo.findOne({ "academicRecords.applicationId": applicationId }),
    Subjects.findOne({ applicationId }),
  ]);

  const status = {
    personalInfo: !!personal,
    academicInfo: !!academic,
    subjectInfo: !!subject,
    finalSubmission: candidate.isSubmitted || false,
  };

  res.status(200).json(new ApiResponse(200, status, "Application status retrieved"));
});


export const getAllStudents = asyncHandler(async (req, res) => {
  // Fetch all candidates with related data
  const candidates = await CandidateRegistration.find()
    .lean(); // lean() makes it return plain JS objects instead of Mongoose docs

  // If you also want personal/academic/subject info in same response
  const students = await Promise.all(
    candidates.map(async (candidate) => {
      const [personal, academic, subject] = await Promise.all([
        personalInfo.findOne({ applicationId: candidate.applicationId }).lean(),
        AcademicInfo.findOne({ "academicRecords.applicationId": candidate.applicationId }).lean(),
        Subjects.findOne({ applicationId: candidate.applicationId }).lean(),
      ]);

      return {
        ...candidate,
        personalInfo: personal || null,
        academicInfo: academic || null,
        subjectInfo: subject || null,
      };
    })
  );

  res.status(200).json(
    new ApiResponse(200, students, "All students retrieved successfully")
  );
});
