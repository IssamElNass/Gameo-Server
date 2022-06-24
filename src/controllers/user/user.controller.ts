import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import UserService from "../../services/user/userService";
import { UserRegisterDTO } from "../../model/user";
import { isAuthenticated } from "../../middelware";

class UserController extends BaseController {
  private userService: UserService = new UserService();

  constructor() {
    super("/users");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setGetRoute({ func: this.getUsers, middelwares: [isAuthenticated] });
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const test: any = await this.userService.getAll();
    console.log(test);

    return res.status(200).json({
      message: test.rows,
    });
  };
}

export default UserController;
