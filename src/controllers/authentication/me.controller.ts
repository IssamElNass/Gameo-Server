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
    let user: AuthRegisterDTO = req.body;

    const authHeader = req.headers["authorization"];
    if (authHeader == null || authHeader == undefined)
      throw new Error("Unauthorized", 401);

    const token: string = authHeader.split(" ")[1];

    const rows: any = await this.authService.getUserByToken(token);
    console.log(rows);

    return res.status(200).json({
      data: rows.rows[0],
    });
  };
}

export default MeController;
