import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import AuthService from "../../services/auth/auth.service";
import { AuthRegisterDTO, AuthSignInDTO, Tokens } from "../../model/auth.model";
import UserService from "../../services/user/user.service";
import { Error } from "../../model/error.model";
import {
  refreshValidator,
  signInValidator,
  signUpValidator,
} from "../../validators/auth";

class AuthController extends BaseController {
  private authService: AuthService = new AuthService();
  private userService: UserService = new UserService();

  constructor() {
    super("/auth");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setPostRoute({
      func: this.registerNewUser,
      path: "/register",
      validators: signUpValidator,
    });
    this.setPostRoute({
      func: this.signIn,
      path: "/signin",
      validators: signInValidator,
    });
    this.setPostRoute({
      func: this.refreshToken,
      path: "/refresh",
      validators: refreshValidator,
    });
  }

  public registerNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = this.validator(req);

      if (!errors.isEmpty()) {
        throw new Error(errors, 500);
      }

      // get the data from req.body
      let user: AuthRegisterDTO = req.body;

      // Check if username / email is already linked with a user
      await this.userService.checkIfUserExists(user.username, user.email);

      const tokens: Tokens = await this.authService.registerUser(user);

      // return response
      return res.status(200).json({
        tokens,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = this.validator(req);

      if (!errors.isEmpty()) {
        throw new Error(errors, 500);
      }

      // get the data from req.body
      let user: AuthSignInDTO = req.body;

      // Check if user exists
      const userExists: boolean = (await this.userService.findOneByEmail(
        user.email.trim()
      ))
        ? true
        : false;

      if (!userExists) throw new Error("User doesn't exists", 400);

      const userWithToken: any = await this.authService.signIn(user);

      if (!userWithToken)
        throw new Error(
          "Login failed, please check your e-mail and password",
          403
        );
      // return response
      return res.status(200).json({
        data: userWithToken,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = this.validator(req);

      if (!errors.isEmpty()) {
        throw new Error(errors, 500);
      }

      // get the data from req.body
      let refresh_token: string = req.body.token;

      const tokens: any = await this.authService.refreshToken(refresh_token);

      if (!tokens) throw new Error("Please sign in again", 403);
      // return response
      return res.status(200).json({
        data: tokens,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };
}

export default AuthController;
