import { verifytoken } from "../utils/tokenUtil.js";

export const accessHandler = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new Error("Token Has Expires");
  }

  const { userid, name } = verifytoken(token);
  req.user = { userid, name };
  next();
};
