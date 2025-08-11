import mongoose from "mongoose";
const subjectsInfoSchema = new mongoose.Schema({
    minorSubject: {
        type: [String]
    },
    majorSubject: {
        type: [String]
    },
    applicationId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalInfo",
    },
    semester: {
        type: String,
        required: true,
        enum: ['First Semester', 'Third Semester', 'Fifth Semester']
    }
}, { timestamps: true })
export const Subjects = mongoose.model("Subjects", subjectsInfoSchema)