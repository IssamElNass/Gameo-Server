import { body, check, header } from "express-validator";

export const signUpValidator: any[] = [
  body("username")
    .isLength({ min: 4 })
    .withMessage("must be at least 4 chars long"),
  body("email").isEmail().trim().withMessage("must be an e-mail"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("must be at least 8 chars long"),
];

export const signInValidator: any[] = [
  body("email").isEmail().trim().withMessage("must be an e-mail"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 chars long"),
];

export const refreshValidator: any[] = [
  body("token")
    .isLength({ min: 20 })
    .not()
    .isEmpty()
    .trim()
    .withMessage("token is not that short"),
];

export const meValidator: any[] = [
  header("authorization")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Bearer token must be provided"),
];
