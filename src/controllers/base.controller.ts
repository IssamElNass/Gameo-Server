import { Router } from "express";
import Controller from "../interfaces/controller";

class BaseController implements Controller {
  public apiUrl = "";
  public router = Router();

  constructor(path: string) {
    this.apiUrl = path;
  }

  private setRoute(method: string, func: any, middelwares?: any[]) {
    switch (method.toUpperCase()) {
      case "GET":
        if (middelwares) this.router.get(this.apiUrl, middelwares, func);
        else this.router.get(this.apiUrl, func);
        break;
      case "POST":
        if (middelwares) this.router.get(this.apiUrl, middelwares, func);
        else this.router.post(this.apiUrl, func);
        break;
      case "PATCH":
        if (middelwares) this.router.get(this.apiUrl, middelwares, func);
        else this.router.patch(this.apiUrl, func);
        break;
      case "DELETE":
        if (middelwares) this.router.get(this.apiUrl, middelwares, func);
        else this.router.delete(this.apiUrl, func);
        break;
      default:
        break;
    }
  }

  public setGetRoute(func: any, middelwares?: any[]) {
    this.setRoute("GET", func, middelwares);
  }

  public setPostRoute(func: any, middelwares?: any[]) {
    this.setRoute("POST", func, middelwares);
  }

  public setUpdateRoute(func: any, middelwares?: any[]) {
    this.setRoute("PATCH", func, middelwares);
  }

  public setDeleteRoute(func: any, middelwares?: any[]) {
    this.setRoute("DELETE", func, middelwares);
  }
}

export default BaseController;
