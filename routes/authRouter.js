import express from "express";
import {
  logincontroller,
  logoutcontroller,
  registercontroller,
} from "../controllers/authController.js";
import {
  loginvalidator,
  registervalidator,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registervalidator, registercontroller);
router.post("/login", loginvalidator, logincontroller);
router.get("/logout", logoutcontroller);

export default router;
