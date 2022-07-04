import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import UserService from "../../services/user/user.service";
import { isAuthenticated } from "../../middelware";
import { User } from "@prisma/client";

class UserController extends BaseController {
  private userService: UserService = new UserService();

  constructor() {
    super("/users");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setGetRoute({
      func: this.getUsers,
      middelwares: [isAuthenticated],
      validators: [],
    });
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users: User[] = await this.userService.getAll();
    return res.status(200).json(users);
  };
}

export default UserController;
