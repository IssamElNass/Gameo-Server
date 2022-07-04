import { Result, ValidationError } from "express-validator";

export class Error {
  message: string | Result<ValidationError>;
  status: number;

  constructor(message: string | Result<ValidationError>, status: number = 500) {
    this.message = message;
    this.status = status;
  }
}
