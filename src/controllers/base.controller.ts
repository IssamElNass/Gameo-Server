import { Router } from "express";
import { validationResult } from "express-validator";
import Controller from "../interfaces/controller";

class BaseController implements Controller {
  public apiUrl: string = "";
  public router: Router = Router();
  public validator = validationResult;
  constructor(path: string) {
    this.apiUrl = path;
  }

  private setRoute(
    method: string,
    path: string,
    func: any,
    validators: any[] = [],
    middelwares: any[] = []
  ) {
    const fullUrl: string = this.apiUrl + path;
    switch (method.toUpperCase()) {
      case "GET":
        this.router.get(fullUrl, middelwares, validators, func);
        // if (middelwares)
        //   this.router.get(fullUrl, middelwares, validators, func);
        // else this.router.get(fullUrl, [], validators, func);
        break;
      case "POST":
        this.router.post(fullUrl, middelwares, validators, func);
        // if (middelwares)
        //   this.router.post(fullUrl, middelwares, validators, func);
        // else this.router.post(fullUrl, [], validators, func);
        break;
      case "PATCH":
        this.router.patch(fullUrl, middelwares, validators, func);
        // if (middelwares) this.router.patch(fullUrl, middelwares, func);
        // else this.router.patch(fullUrl, func);
        break;
      case "DELETE":
        this.router.delete(fullUrl, middelwares, validators, func);
        // if (middelwares) this.router.delete(fullUrl, middelwares, func);
        // else this.router.delete(fullUrl, func);
        break;
      default:
        break;
    }
  }

  public setGetRoute({
    func,
    middelwares,
    validators,
    path = "",
  }: {
    func: any;
    middelwares?: any[];
    validators: any[];
    path?: string;
  }) {
    this.setRoute("GET", path, func, validators, middelwares);
  }

  public setPostRoute({
    func,
    middelwares,
    validators,
    path = "",
  }: {
    func: any;
    middelwares?: any[];
    validators: any[];
    path?: string;
  }) {
    this.setRoute("POST", path, func, validators, middelwares);
  }

  public setUpdateRoute({
    func,
    middelwares,
    validators,
    path = "",
  }: {
    func: any;
    middelwares?: any[];
    validators: any[];
    path?: string;
  }) {
    this.setRoute("PATCH", path, func, validators, middelwares);
  }

  public setDeleteRoute({
    func,
    middelwares,
    validators,
    path = "",
  }: {
    func: any;
    middelwares?: any[];
    validators: any[];
    path?: string;
  }) {
    this.setRoute("DELETE", path, func, validators, middelwares);
  }
}

export default BaseController;
