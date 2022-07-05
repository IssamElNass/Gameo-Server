import { query } from "express-validator";

export const saveUpdateLogValidator: any[] = [
  query("gameId")
    .isInt()
    .notEmpty()
    .withMessage("must be an int and not empty"),
  query("statusId")
    .isInt()
    .notEmpty()
    .withMessage("must be an int and not empty"),
];
