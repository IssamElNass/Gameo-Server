import BaseController from "../base.controller";
import { Request, Response, NextFunction } from "express";
import GameService from "../../services/game/game.service";
import { Error } from "../../model/error.model";
import { isAuthenticated } from "../../middelware";
import AuthService from "../../services/auth/auth.service";
import {
  getAllValidator,
  getByIdValidator,
  getBySlugValidator,
} from "../../validators/game";
import { GamesFilter } from "../../model/game.model";
import { validateRequest } from "../../utils/validation.utils";

class GameController extends BaseController {
  private gameService: GameService = new GameService();
  private authService: AuthService = new AuthService();

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
    // this.setPostRoute({
    //   func: this.setPlayStatusGame,
    //   middelwares: [isAuthenticated],
    //   path: "/log",
    // });
    // this.setUpdateRoute({
    //   func: this.updatePlayStatusGame,
    //   middelwares: [isAuthenticated],
    //   path: "/log",
    // });
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

      const games: any[] = await this.gameService.getAll(filterOptions);

      // return response
      return res.status(200).json({
        games,
      });
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

      const game: any = await this.gameService.getById(gameId);

      return res.status(200).json({
        game,
      });
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

      const game: any = await this.gameService.getBySlug(gameSlug);

      return res.status(200).json({
        game,
      });
    } catch (error: any) {
      next(new Error(error.message, error.status));
    }
  };

  // public setPlayStatusGame = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     console.log(req.body);

  //     if (Object.keys(req.body).length !== 2)
  //       throw new Error("Issue with the body", 400);

  //     const authHeader = req.headers["authorization"];
  //     if (authHeader == null || authHeader == undefined)
  //       throw new Error("Unauthorized", 401);

  //     const token: string = authHeader.split(" ")[1];

  //     const foundUser: any = await this.authService.getUserByToken(token);
  //     console.log(foundUser);

  //     const result: any = await this.gameService.addPlayStatusToGame(
  //       req.body.gameId,
  //       req.body.statusId,
  //       foundUser.id
  //     );
  //     console.log(result);
  //     return res.status(200).json({
  //       data: result,
  //     });
  //   } catch (error: any) {
  //     next(new Error(error.message, error.status));
  //   }
  // };

  // public updatePlayStatusGame = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     console.log(req.body);

  //     if (Object.keys(req.body).length !== 2)
  //       throw new Error("Issue with the body", 400);

  //     const authHeader = req.headers["authorization"];
  //     if (authHeader == null || authHeader == undefined)
  //       throw new Error("Unauthorized", 401);

  //     const token: string = authHeader.split(" ")[1];

  //     const foundUser: any = await this.authService.getUserByToken(token);
  //     console.log(foundUser);

  //     const result: any = await this.gameService.updatePlayStatusToGame(
  //       req.body.gameId,
  //       req.body.statusId,
  //       foundUser.id
  //     );
  //     console.log(result);
  //     return res.status(200).json({
  //       data: result,
  //     });
  //   } catch (error: any) {
  //     next(new Error(error.message, error.status));
  //   }
  // };
}

export default GameController;
