import { validationResult } from "express-validator";
import { Error } from "../model/error.model";
import { Request } from "express";

export function validateRequest(request: Request): void {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    throw new Error(errors, 500);
  }
}
