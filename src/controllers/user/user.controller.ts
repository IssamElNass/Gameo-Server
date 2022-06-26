import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import UserService from "../../services/user/user.service";
import { isAuthenticated } from "../../middelware";

class UserController extends BaseController {
  private userService: UserService = new UserService();

  constructor() {
    super("/users");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setGetRoute({ func: this.getUsers, middelwares: [] });
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const result: any = await this.userService.getAllUsers();
    return res.status(200).json({
      message: result,
    });
  };
}

export default UserController;
