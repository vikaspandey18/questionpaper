import { body, validationResult } from "express-validator";

const withvalidator = (validator) => {
  return [
    validator,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        const errorMessage = errors.array().map((error) => error.msg);
        throw new Error(errorMessage);
      }
      next();
    },
  ];
};

export const loginvalidator = withvalidator([
  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Not a proper Email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3 })
    .withMessage("Password Should be more then 3 chracter"),
]);

export const registervalidator = withvalidator([
  body("name")
    .notEmpty()
    .withMessage("name is Required")
    .isLength({ min: 3 })
    .withMessage("Name Should be more then 3 chracter"),
  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Not a proper Email"),
  body("mobile")
    .notEmpty()
    .withMessage("Email is Required")
    .isNumeric()
    .withMessage("Mobile No Should be Numeric")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile No should be 10 digit"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3 })
    .withMessage("Password Should be more then 3 chracter"),
  body("cnpassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .isLength({ min: 3 })
    .withMessage("Confirm Password Should be more then 3 chracter"),
]);
