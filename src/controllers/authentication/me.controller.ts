import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import { AuthRegisterDTO } from "../../model/auth.model";
import { isAuthenticated } from "../../middelware";
import { Error } from "../../model/error.model";
import { MeService } from "../../services";

class MeController extends BaseController {
  private meService: MeService = new MeService();

  constructor() {
    super("/me");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setGetRoute({
      func: this.getCurrentUserByToken,
      middelwares: [isAuthenticated],
      validators: [],
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

    const foundUser: any = await this.meService.getByAccessToken(token);
    console.log(foundUser);

    return res.status(200).json({
      data: foundUser,
    });
  };
}

export default MeController;
