import User from "../models/userModel.js";
import { creattoken } from "../utils/tokenUtil.js";

export const logincontroller = async (req, res) => {
  const users = await User.findOne(req.body);
  if (users) {
    const token = creattoken({ userid: users._id, name: users.name });
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 60 * 24 * 7),
    });

    return res.status(200).json({ msg: "Login Successfully" });
  } else {
    return res.status(400).json({ msg: "No User Found" });
  }
};

export const registercontroller = async (req, res) => {
  if (req.body.password === req.body.cnpassword) {
    const users = await User.create(req.body);
    if (users) {
      return res
        .status(200)
        .json({ msg: "Register Successfully, Kindly Login" });
    } else {
      return res
        .status(400)
        .json({ msg: "Failed To Register,Please Try Again" });
    }
  } else {
    return res
      .status(400)
      .json({ msg: "Password And Confirm Password Does Not Matched" });
  }
};

export const logoutcontroller = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(200).json({ msg: "Logout Successfully" });
};


