import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    subject: { type: String, trim: true, required: true },
    message: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
