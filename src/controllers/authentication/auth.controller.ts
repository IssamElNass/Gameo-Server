import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import AuthService from "../../services/auth/authService";
import { AuthRegisterDTO } from "../../model/auth";
import { isAuthenticated } from "../../middelware";
import UserService from "../../services/user/userService";

class AuthController extends BaseController {
  private authService: AuthService = new AuthService();
  private userService: UserService = new UserService();

  constructor() {
    super("/auth");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setPostRoute({ func: this.registerNewUser, path: "/register" });
  }

  public registerNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // get the data from req.body
    let user: AuthRegisterDTO = req.body;
    console.log(user);

    const token: string = await this.authService.registerUser(user);
    // return response
    return res.status(200).json({
      auth_token: token,
    });
  };
}

export default AuthController;
