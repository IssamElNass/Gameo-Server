import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import { Error } from "../../model/error.model";
import { isAuthenticated } from "../../middelware";
import { validateRequest } from "../../utils/validation.utils";
import { Log, User } from "@prisma/client";
import { saveUpdateLogValidator } from "../../validators/log";
import { LogService, UserService } from "../../services";

class LogController extends BaseController {
  private logService: LogService = new LogService();
  private userService: UserService = new UserService();

  constructor() {
    super("/games");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setPostRoute({
      func: this.saveLog,
      middelwares: [isAuthenticated],
      path: "/log",
      validators: saveUpdateLogValidator,
    });
    this.setUpdateRoute({
      func: this.putLog,
      middelwares: [isAuthenticated],
      path: "/log",
      validators: saveUpdateLogValidator,
    });
  }

  public saveLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateRequest(req);

      const authHeader = req.headers["authorization"];
      if (authHeader == null || authHeader == undefined)
        throw new Error("Unauthorized", 401);

      if (!authHeader.split(" ")[1]) throw new Error("Unauthorized", 401);
      const token: string = authHeader.split(" ")[1];

      const foundUser: User = await this.userService.getUserByToken(token);

      const createdLog: Log = await this.logService.saveLog(
        Number(req.query.gameId),
        Number(req.query.statusId),
        foundUser.id
      );

      return res.status(200).json(createdLog);
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  public putLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateRequest(req);

      const authHeader = req.headers["authorization"];
      if (authHeader == null || authHeader == undefined)
        throw new Error("Unauthorized", 401);
      if (!authHeader.split(" ")[1]) throw new Error("Unauthorized", 401);

      const token: string = authHeader.split(" ")[1];
      const foundUser: User = await this.userService.getUserByToken(token);

      const updatedLog: Log = await this.logService.putLog(
        Number(req.query.gameId),
        Number(req.query.statusId),
        foundUser.id
      );
      return res.status(200).json(updatedLog);
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };
}

export default LogController;
