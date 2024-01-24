import jwt from "jsonwebtoken";

export const creattoken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const verifytoken = (token) => {
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  return decode;
};
