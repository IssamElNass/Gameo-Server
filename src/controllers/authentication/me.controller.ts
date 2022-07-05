import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../../middelware";
import { Error } from "../../model/error.model";
import { MeService } from "../../services";
import { meValidator } from "../../validators/auth";
import { validateRequest } from "../../utils/validation.utils";
import { User } from "@prisma/client";

class MeController extends BaseController {
  private meService: MeService = new MeService();

  constructor() {
    super("/me");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setGetRoute({
      func: this.getCurrentUser,
      middelwares: [isAuthenticated],
      validators: meValidator,
    });
  }

  public getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      validateRequest(req);

      const authHeader = req.headers["authorization"];
      if (authHeader == null || authHeader == undefined)
        throw new Error("Unauthorized", 401);

      const token: string = authHeader.split(" ")[1];
      if (!authHeader.split(" ")[1]) throw new Error("Unauthorized", 401);
      const user: User = await this.meService.getByAccessToken(token);
      return res.status(200).json(user);
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };
}

export default MeController;
