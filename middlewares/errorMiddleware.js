export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Somethink Went Wrong";
  return res.status(status).json({ msg: message });
};
