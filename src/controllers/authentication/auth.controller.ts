import { Request, Response, NextFunction } from "express";
// Base Controller
import BaseController from "../base.controller";
// Services
import { AuthService, UserService } from "../../services";
// Models
import { AuthRegisterDTO, AuthSignInDTO, Tokens } from "../../model/auth.model";
import { Error } from "../../model/error.model";
// Validators
import {
  refreshValidator,
  signInValidator,
  signUpValidator,
} from "../../validators/auth";
import { validateRequest } from "../../utils/validation.utils";

/**
 * Authentication Controller
 *
 * Requests to sign the user up or in, refresh their token
 */
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
      validateRequest(req);

      let user: AuthRegisterDTO = req.body;

      await this.userService.checkIfUserExists(user.username, user.email);

      const tokens: Tokens = await this.authService.saveUser(user);

      return res.status(200).json({
        tokens,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateRequest(req);

      const signInValues: AuthSignInDTO = req.body;

      const userExists: boolean = (await this.userService.getByEmail(
        signInValues.email
      ))
        ? true
        : false;

      if (!userExists) throw new Error("User doesn't exists", 400);

      const tokens: Tokens | null = await this.authService.signUserIn(
        signInValues
      );

      return res.status(200).json({
        tokens,
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
      validateRequest(req);

      const refresh_token: string = req.body.token;
      const tokens: Tokens = await this.authService.refreshToken(refresh_token);

      return res.status(200).json({
        tokens,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };
}

export default AuthController;
