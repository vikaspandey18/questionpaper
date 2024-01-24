import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    userid: { type: mongoose.Types.ObjectId, ref: "User" },
    standard: { type: mongoose.Types.ObjectId, ref: "Standard" },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", SubjectSchema);

export default Subject;
