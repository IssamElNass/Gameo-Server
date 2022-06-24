import { Router } from "express";
import Controller from "../interfaces/controller";

class BaseController implements Controller {
  public apiUrl = "";
  public router = Router();

  constructor(path: string) {
    this.apiUrl = path;
  }

  private setRoute(
    method: string,
    path: string,
    func: any,
    middelwares?: any[]
  ) {
    const fullUrl: string = this.apiUrl + path;

    switch (method.toUpperCase()) {
      case "GET":
        if (middelwares) this.router.get(fullUrl, middelwares, func);
        else this.router.get(fullUrl, func);
        break;
      case "POST":
        if (middelwares) this.router.get(fullUrl, middelwares, func);
        else this.router.post(fullUrl, func);
        break;
      case "PATCH":
        if (middelwares) this.router.get(fullUrl, middelwares, func);
        else this.router.patch(fullUrl, func);
        break;
      case "DELETE":
        if (middelwares) this.router.get(fullUrl, middelwares, func);
        else this.router.delete(fullUrl, func);
        break;
      default:
        break;
    }
  }

  public setGetRoute({
    func,
    middelwares,
    path = "",
  }: {
    func: any;
    middelwares?: any[];
    path?: string;
  }) {
    this.setRoute("GET", path, func, middelwares);
  }

  public setPostRoute({
    func,
    middelwares,
    path = "",
  }: {
    func: any;
    middelwares?: any[];
    path?: string;
  }) {
    this.setRoute("POST", path, func, middelwares);
  }

  public setUpdateRoute({
    func,
    middelwares,
    path = "",
  }: {
    func: any;
    middelwares?: any[];
    path?: string;
  }) {
    this.setRoute("PATCH", path, func, middelwares);
  }

  public setDeleteRoute({
    func,
    middelwares,
    path = "",
  }: {
    func: any;
    middelwares?: any[];
    path?: string;
  }) {
    this.setRoute("DELETE", path, func, middelwares);
  }
}

export default BaseController;
