import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import GameService from "../../services/game/game.service";
import { Error } from "../../model/error.model";
import { isAuthenticated } from "../../middelware";

class GameController extends BaseController {
  private gameService: GameService = new GameService();

  constructor() {
    super("/games");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setGetRoute({
      func: this.allGames,
      path: "/all",
      middelwares: [isAuthenticated],
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
}

export default GameController;
