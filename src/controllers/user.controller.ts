import { Router } from "express";
import Controller from "../interfaces/controller";
import BaseController from "./base.controller";
import { Request, Response, NextFunction } from "express";
import { getAllUsers, addUser } from "../services/userService";

class UserController extends BaseController {
  constructor() {
    super("/users");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setGetRoute(this.getUsers);
  }

  public async getUsers(req: Request, res: Response, next: NextFunction) {
    const test: any = await getAllUsers();
    console.log(test);

    return res.status(200).json({
      message: test.rows,
    });
  }

  public async addNewUser(req: Request, res: Response, next: NextFunction) {
    // get the data from req.body
    let newUser = req.body;
    console.log(newUser);

    //await addUser();
    // return response
    return res.status(200).json({
      message: "ok",
    });
  }
}

export default UserController;
