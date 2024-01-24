import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    mobile: { type: Number, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    gender: { type: String, enum: ["male", "female"] },
    image: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
