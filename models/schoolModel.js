import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
  {
    schoolname: { type: String, trim: true, required: true },
    schoolimage: { type: String, trim: true, required: true },
    userid: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const School = mongoose.model("School", SchoolSchema);
export default School;
