import { Router } from "express";

export default interface Controller {
  apiUrl: string;
  router: Router;
}
