import { body } from "express-validator";
import { users } from "../app.js";

export const formValidation = [
  // NAME
  body("name")
    .custom((value) => {
      const existUser = users.find((user) => user.name === value);
      if (existUser) {
        if (existUser) {
          throw new Error("The name already exist!");
        }
      }
      return true;
    })
    .escape()
    .notEmpty()
    .withMessage("name shouldnot be left empty")
    .isAlphanumeric()
    .withMessage("Alphabets and Numbers only"),
  // EMAIL
  body("email")
    .custom((value) => {
      const existEmail = users.find((user) => user.email === value);
      if (existEmail) {
        throw new Error("The email already exist!");
      };
      return true;
    })
    .isEmail()
    .normalizeEmail()
    .withMessage("must be an email"),
  // PASSWORD
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password is too short")
    .notEmpty()
    .withMessage("Password shouldnot be left empty"),
];
