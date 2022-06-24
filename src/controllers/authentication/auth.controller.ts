import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import AuthService from "../../services/auth/authService";
import { AuthRegisterDTO, AuthSignInDTO } from "../../model/auth";
import UserService from "../../services/user/userService";
import { Error } from "../../model/error";

class AuthController extends BaseController {
  private authService: AuthService = new AuthService();
  private userService: UserService = new UserService();

  constructor() {
    super("/auth");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setPostRoute({ func: this.registerNewUser, path: "/register" });
    this.setPostRoute({ func: this.signIn, path: "/signin" });
  }

  public registerNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (Object.keys(req.body).length < 2)
        throw new Error("Issue with the request body", 400);

      // get the data from req.body
      let user: AuthRegisterDTO = req.body;

      // Check if username / email is already linked with a user
      await this.userService.checkIfUserExists(user.username, user.email);

      const token: string = await this.authService.registerUser(user);

      // return response
      return res.status(200).json({
        auth_token: token,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (Object.keys(req.body).length < 1)
        throw new Error("Issue with the request body", 400);

      // get the data from req.body
      let user: AuthSignInDTO = req.body;
      // Check if user exists
      const userExists: boolean = await this.userService.findOneByUsername(
        user.username
      );
      if (!userExists) throw new Error("User doesn't exists", 400);

      const token: string = await this.authService.signIn(user);

      // return response
      return res.status(200).json({
        auth_token: token,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };
}

export default AuthController;
