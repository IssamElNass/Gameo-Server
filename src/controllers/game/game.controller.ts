import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import GameService from "../../services/game/game.service";
import { Error } from "../../model/error.model";
import { isAuthenticated } from "../../middelware";
import AuthService from "../../services/auth/auth.service";

class GameController extends BaseController {
  private gameService: GameService = new GameService();
  private authService: AuthService = new AuthService();

  constructor() {
    super("/games");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setGetRoute({
      func: this.allGames,
      path: "/all",
    });
    this.setGetRoute({
      func: this.singleGameById,
      path: "/detail?:id",
    });
    this.setPostRoute({
      func: this.setPlayStatusGame,
      middelwares: [isAuthenticated],
      path: "/log",
    });
    this.setUpdateRoute({
      func: this.updatePlayStatusGame,
      middelwares: [isAuthenticated],
      path: "/log",
    });
  }

  public allGames = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (Object.keys(req.body).length > 0)
        throw new Error("Issue with the request body", 400);

      const games: any[] = await this.gameService.getAllGames();

      // return response
      return res.status(200).json({
        games: games,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  public singleGameById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (Object.keys(req.query).length !== 1)
        throw new Error("Issue with the query", 400);

      const gameId: number = Number(req.query.id) || 0;
      if (gameId === 0) throw new Error("Wrong Id", 400);

      const game: any = await this.gameService.findOneById(gameId);

      // return response
      return res.status(200).json({
        data: game,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  public setPlayStatusGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.body);

      if (Object.keys(req.body).length !== 2)
        throw new Error("Issue with the body", 400);

      const authHeader = req.headers["authorization"];
      if (authHeader == null || authHeader == undefined)
        throw new Error("Unauthorized", 401);

      const token: string = authHeader.split(" ")[1];

      const foundUser: any = await this.authService.getUserByToken(token);
      console.log(foundUser);

      const result: any = await this.gameService.addPlayStatusToGame(
        req.body.gameId,
        req.body.statusId,
        foundUser.id
      );
      console.log(result);
      return res.status(200).json({
        data: result,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  public updatePlayStatusGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.body);

      if (Object.keys(req.body).length !== 2)
        throw new Error("Issue with the body", 400);

      const authHeader = req.headers["authorization"];
      if (authHeader == null || authHeader == undefined)
        throw new Error("Unauthorized", 401);

      const token: string = authHeader.split(" ")[1];

      const foundUser: any = await this.authService.getUserByToken(token);
      console.log(foundUser);

      const result: any = await this.gameService.updatePlayStatusToGame(
        req.body.gameId,
        req.body.statusId,
        foundUser.id
      );
      console.log(result);
      return res.status(200).json({
        data: result,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };
}

export default GameController;
