import { Router } from "express";
import { ResultFactory, ValidationError } from "express-validator";

export default interface Controller {
  apiUrl: string;
  router: Router;
  validator: ResultFactory<ValidationError>;
}
