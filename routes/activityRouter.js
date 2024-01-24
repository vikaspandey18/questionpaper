import express from "express";
import {
  addschoolcontroller,
  chaptercontroller,
  contactform,
  getstandard,
  getsubject,
  standardcontroller,
  subjectcontroller,
  getalldivision,
  generatequestion,
  getSubjectStandard,
  getSubjectStandardChapter,
  getquestions,
  addquestiontemplate,
  createtemplates,
  getuserschool,
  generatetemplate,
} from "../controllers/activityController.js";

import {
  chaptervalidation,
  contactvalidation,
  geneatequestionvalidation,
  getquestionsvalidator,
  standardvalidation,
  subjectvalidation,
} from "../middlewares/activityMiddleware.js";

import upload from "../middlewares/multerMiddleware.js";
import multer from "multer";

const storage = multer.memoryStorage();
const arrayupload = multer({ storage });

const router = express.Router();

router.post("/addschool", upload.single("schoolfile"), addschoolcontroller);
router.post("/contact", contactvalidation, contactform);
router.post("/standard", standardvalidation, standardcontroller);
router.get("/getstandard", getstandard);
router.post("/add-subject", subjectvalidation, subjectcontroller);
router.get("/getsubject", getsubject);
router.post("/add-chapter", chaptervalidation, chaptercontroller);
router.get("/getalldivision", getalldivision);
// router.post("/generatequestion", geneatequestionvalidation, generatequestion);
router.post(
  "/generatequestion",
  arrayupload.array("options"),
  geneatequestionvalidation,
  generatequestion
);
router.get("/getsubjects/:id", getSubjectStandard);
router.get("/getchapter/:standard/:subject", getSubjectStandardChapter);
router.post("/getquestions", getquestionsvalidator, getquestions);
router.post("/questiontemplate", addquestiontemplate);
router.post("/createtemplate", createtemplates);
router.get("/loadschool", getuserschool);
router.post("/generatetemplate", generatetemplate);

export default router;
