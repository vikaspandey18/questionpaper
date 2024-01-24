import { body, validationResult } from "express-validator";

const withvalidation = (validation) => {
  return [
    validation,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new Error(errorMessages);
        // return res.status(400).json({ msg: errorMessages });
      }
      next();
    },
  ];
};

export const contactvalidation = withvalidation([
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
]);

export const standardvalidation = withvalidation([
  body("name").notEmpty().withMessage("Standard is required"),
]);

export const subjectvalidation = withvalidation([
  body("name").notEmpty().withMessage("Subject is required"),
  body("standard").notEmpty().withMessage("Standard is required"),
]);

export const chaptervalidation = withvalidation([
  body("name").notEmpty().withMessage("Chapter is required"),
  body("standard").notEmpty().withMessage("Standard is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
]);

export const geneatequestionvalidation = withvalidation([
  body("text").notEmpty().withMessage("Question is required"),
  body("typeofquestion").notEmpty().withMessage("Question Type is required"),
  body("options").isArray({ min: 1 }).withMessage("Options are required"),
  body("correctanswer").notEmpty().withMessage("Correct Answer is required"),
  body("standard").notEmpty().withMessage("Standard is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("chapter").notEmpty().withMessage("Chapter is required"),
]);

export const getquestionsvalidator = withvalidation([
  body("typeofquestion").notEmpty().withMessage("Question Type is required"),
  body("standard").notEmpty().withMessage("Standard is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("chapter").notEmpty().withMessage("Chapter is required"),
]);
