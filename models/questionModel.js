import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    options: [{ type: String, required: true, trim: true }],
    correctanswer: { type: String },
    typeofquestion: { type: String },
    standard: { type: mongoose.Types.ObjectId, ref: "Standard" },
    subject: { type: mongoose.Types.ObjectId, ref: "Subject" },
    chapter: { type: mongoose.Types.ObjectId, ref: "Chapter" },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
