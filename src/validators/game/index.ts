import { param, query } from "express-validator";

export const getAllValidator: any[] = [
  query("offset")
    .isInt()
    .notEmpty()
    .withMessage("must be an int and not empty"),
  query("limit")
    .isInt({ min: 5, max: 25 })
    .notEmpty()
    .withMessage("must be an int and not empty"),
];

export const getByIdValidator: any[] = [
  query("id").isInt().notEmpty().withMessage("must be an int and not empty"),
];

export const getBySlugValidator: any[] = [
  param("slug")
    .notEmpty()
    .isSlug()
    .withMessage("must be a string and not empty"),
];

export const getAllOtherValidator: any[] = [
  query("offset")
    .isInt()
    .notEmpty()
    .withMessage("must be an int and not empty"),
  query("limit")
    .isInt({ min: 5, max: 25 })
    .notEmpty()
    .withMessage("must be an int and not empty"),
  query("id").isInt().notEmpty().withMessage("must be an int and not empty"),
  query("type")
    .exists()
    .withMessage("Type is Requiered")
    .isString()
    .withMessage("Type must be a String")
    .isIn(["genre", "platform", "company"])
    .withMessage("Type does contain invalid value"),
];
