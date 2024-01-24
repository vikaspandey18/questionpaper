import mongoose from "mongoose";

const questionTemplateSchema = new mongoose.Schema(
  {
    // questionid: { type: mongoose.Types.ObjectId, ref: "Question" },
    userid: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    questions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const QuestionTemplate = mongoose.model(
  "QuestionTemplate",
  questionTemplateSchema
);

export default QuestionTemplate;
