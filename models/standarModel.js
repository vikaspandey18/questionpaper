import mongoose from "mongoose";

const StandardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    userid: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Standard = mongoose.model("Standard", StandardSchema);

export default Standard;
