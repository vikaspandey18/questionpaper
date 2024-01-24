import User from "../models/userModel.js";

export const getcurrentusercontroller = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userid }, { password: 0 });
  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.status(400).json({ msg: "Sorry No User Found" });
  }
};

export const updatecurrentuser = async (req, res) => {
  const objectdata = req.file
    ? { ...req.body, image: req.file.filename }
    : req.body;

  const user = await User.findByIdAndUpdate(req.user.userid, objectdata);

  if (user) {
    return res.status(200).json({ msg: "User Updated Successfully" });
  } else {
    return res.status(400).json({ msg: "Failed to Update User" });
  }
};
