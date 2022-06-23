import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import AuthService from "../../services/auth/authService";
import { AuthRegisterDTO } from "../../model/auth";
import { isAuthenticated } from "../../middelware";

class AuthController extends BaseController {
  private authService: AuthService = new AuthService();

  constructor() {
    super("/auth");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setPostRoute(this.registerNewUser);
  }

  public registerNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // get the data from req.body
    let user: AuthRegisterDTO = req.body;
    console.log(user);

    const test: any = await this.authService.registerUser(user);
    // return response
    return res.status(200).json({
      message: test.rows,
    });
  };
}

export default AuthController;
