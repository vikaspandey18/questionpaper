import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    userid: { type: mongoose.Types.ObjectId, ref: "User" },
    standard: { type: mongoose.Types.ObjectId, ref: "Standard" },
    subject: { type: mongoose.Types.ObjectId, ref: "Subject" },
  },
  {
    timestamps: true,
  }
);

const Chapter = mongoose.model("Chapter", ChapterSchema);

export default Chapter;
