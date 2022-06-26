import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import AuthService from "../../services/auth/auth.service";
import { AuthRegisterDTO } from "../../model/auth.model";
import { isAuthenticated } from "../../middelware";
import { Error } from "../../model/error.model";

class MeController extends BaseController {
  private authService: AuthService = new AuthService();

  constructor() {
    super("/me");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setGetRoute({
      func: this.getCurrentUserByToken,
      middelwares: [isAuthenticated],
    });
  }

  public getCurrentUserByToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers["authorization"];
    if (authHeader == null || authHeader == undefined)
      throw new Error("Unauthorized", 401);

    const token: string = authHeader.split(" ")[1];

    const foundUser: any = await this.authService.getUserByToken(token);
    console.log(foundUser);

    return res.status(200).json({
      data: foundUser,
    });
  };
}

export default MeController;
