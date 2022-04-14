import { Router } from "express";
import Controller from "../interfaces/controller";

class BaseController implements Controller {
  public apiUrl = "";
  public router = Router();

  constructor(path: string) {
    this.apiUrl = path;
    // this.intializeRoutes();
  }

  // public intializeRoutes() {
  //   this.router.get(this.path, this.getAllPosts);
  //   this.router.post(this.path, this.createAPost);
  // }

  public setGetRoute(func: any) {
    this.router.get(this.apiUrl, func);
  }

  public setPostRoute(func: any) {
    this.router.post(this.apiUrl, func);
  }

  public setUpdateRoute(func: any) {
    this.router.patch(this.apiUrl, func);
  }

  public setDeleteRoute(func: any) {
    this.router.delete(this.apiUrl, func);
  }
}

export default BaseController;
