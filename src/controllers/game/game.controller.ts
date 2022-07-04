import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import GameService from "../../services/game/game.service";
import { Error } from "../../model/error.model";
import {
  getAllValidator,
  getByIdValidator,
  getBySlugValidator,
} from "../../validators/game";
import { GamesFilter } from "../../model/game.model";
import { validateRequest } from "../../utils/validation.utils";
import { Game } from "@prisma/client";

class GameController extends BaseController {
  private gameService: GameService = new GameService();

  constructor() {
    super("/games");
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.setGetRoute({
      func: this.getAllGames,
      path: "/all",
      validators: getAllValidator,
    });
    this.setGetRoute({
      func: this.getGameById,
      validators: getByIdValidator,
    });
    this.setGetRoute({
      func: this.getGameBySlug,
      path: "/:slug",
      validators: getBySlugValidator,
    });
  }

  public getAllGames = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      validateRequest(req);

      const filterOptions: GamesFilter = {
        offset: Number(req.query.offset),
        limit: Number(req.query.limit),
      };

      const games: Game[] = await this.gameService.getAll(filterOptions);
      return res.status(200).json(games);
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  public getGameById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      validateRequest(req);

      const gameId: number = Number(req.query.id) || 0;
      if (gameId === 0) throw new Error("Wrong Id", 400);

      const game: Game = await this.gameService.getById(gameId);
      return res.status(200).json(game);
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  public getGameBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      validateRequest(req);

      const gameSlug: string = req.params.slug || "";
      if (gameSlug === "") throw new Error("Slug not found", 400);

      const game: Game = await this.gameService.getBySlug(gameSlug);
      return res.status(200).json(game);
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };
}

export default GameController;
