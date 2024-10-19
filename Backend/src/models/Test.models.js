import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    TestName: {
        type: String,
        required: true,
    },
    JobRoleName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobRole",
    },
    questions: [
        {
            question: {
                type: String,
                required: true,
            },
            options: [String],
            optionNumber: {
                type: Number,
                required: true,
            },
        },
    ],
    results: [
        {
            ApplicantEmail: {
                type: String,
            },
            score: {
                type: Number,
            },
        },
    ],
});

export const Test = mongoose.model("Test", TestSchema);