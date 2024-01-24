import "express-async-errors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connection from "./dbs/connect.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import activityRouter from "./routes/activityRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { accessHandler } from "./middlewares/accessMiddleware.js";

const app = express();
const port = process.env.PORT;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());

//MIDDLEWARE

//ROUTER
app.use("/api/auth", authRouter);
app.use("/api/user", accessHandler, userRouter);
app.use("/api/activity", accessHandler, activityRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(400).json({ msg: "No Route Found" });
});
app.use(errorMiddleware);

//DATABASE
connection();

//SERVER
app.listen(port, () => {
  console.log(`Server Started At ${port}`);
});
