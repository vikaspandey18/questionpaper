import express from "express";
import upload from "../middlewares/profileMulterMiddleware.js";
import {
  getcurrentusercontroller,
  updatecurrentuser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getcurrentusercontroller);
router.patch("/updateuser", upload.single("image"), updatecurrentuser);

export default router;
