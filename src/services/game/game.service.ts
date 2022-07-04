import BaseService from "../base.service";
import { Error } from "../../model/error.model";
import {
  gameAllQuery,
  gameSingleByIdQuery,
  gameSingleBySlugQuery,
} from "../../queries/games";

/*
/ Get
/ Save
/ Put
/ Delete
*/

/**
 * This service takes care of the games in the db.
 *
 * This includes: Saving a game, Getting trending games, Getting a game by id or slug
 */
class GameService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Gets all the games from the database
   * @return {Promise<any>} Returns all the games
   * @example
   * const games: any = getAll();
   */
  public async getAll(): Promise<any> {
    const result: any = await this.prismaClient.game.findMany(gameAllQuery());
    return result;
  }

  /**
   * Gets a game by the gameId
   * @param {number} gameId - The id of the game
   * @return {Promise<any>} Returns the game
   * @example
   * const game: any = getById(1);
   */
  public async getById(gameId: number): Promise<any> {
    return await this.prismaClient.game.findUnique(gameSingleByIdQuery(gameId));
  }

  /**
   * Gets a game by the game slug
   * @param {string} gameSlug - The slug of the game
   * @return {Promise<any>} Returns the game
   * @example
   * const game: any = getBySlug("silly-bandz");
   */
  public async getBySlug(gameSlug: string): Promise<any> {
    return await this.prismaClient.game.findFirst(
      gameSingleBySlugQuery(gameSlug)
    );
  }

  public async addPlayStatusToGame(
    gameId: number,
    statusId: number,
    userId: string
  ): Promise<any> {
    try {
      this.checkGameAndStatus(gameId, statusId);

      const collectionResult: any = await this.findLogIdByGameIdAndUserId(
        gameId,
        userId
      );

      if (collectionResult) throw new Error("Log already exists");

      const result: any = await this.prismaClient.log.create({
        data: {
          statusId: statusId,
          gameId: gameId,
          userId: userId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  private async findLogIdByGameIdAndUserId(
    gameId: number,
    userId: string
  ): Promise<any> {
    return await this.prismaClient.log.findFirst({
      where: {
        gameId: gameId,
        userId: userId,
      },
      select: {
        id: true,
      },
    });
  }

  public async checkGameAndStatus(
    gameId: number,
    statusId: number
  ): Promise<any> {
    const gameResult: any = await this.prismaClient.game.findUnique({
      where: {
        id: gameId,
      },
      select: {
        id: true,
      },
    });

    const statusResult: any = await this.prismaClient.status.findUnique({
      where: {
        id: statusId,
      },
      select: {
        id: true,
      },
    });

    if (!gameResult) throw new Error("Game doesn't exist in db");
    else if (!statusResult) throw new Error("Playstatus doesn't exist in db");
  }

  public async updatePlayStatusToGame(
    gameId: number,
    statusId: number,
    userId: string
  ): Promise<any> {
    try {
      this.checkGameAndStatus(gameId, statusId);

      const collectionResult: any = await this.findLogIdByGameIdAndUserId(
        gameId,
        userId
      );

      console.log(collectionResult);

      if (!collectionResult) throw new Error("Log doesn't exists");

      const result: any = await this.prismaClient.log.update({
        where: {
          id: collectionResult.id,
        },
        data: {
          statusId: statusId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default GameService;
