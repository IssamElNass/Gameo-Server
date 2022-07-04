import BaseService from "../base.service";
import { Error } from "../../model/error.model";
import {
  saveLogQuery,
  getByGameAndUserIdQuery,
  putLogQuery,
  getGameById,
  getStatusById,
} from "../../queries/log";
import { Game, Log, Status } from "@prisma/client";

/**
 * This service takes care of the logs/playstatus in the db.
 *
 * This includes: Saving a log, Getting a log, updating a log
 */
class LogService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Saves a log from the user for a game to the database
   * @param {number} gameId - The id of the game
   * @param {number} statusId - The id of the status
   * @param {string} userId - The id of the user
   * @return {Promise<Log>} Returns the newly created log
   * @example
   * saveLog(1,2,"1561-5646-4648-41af")
   */
  public async saveLog(
    gameId: number,
    statusId: number,
    userId: string
  ): Promise<Log> {
    try {
      await this.checkGameAndStatus(gameId, statusId);

      const log: Log = await this.getByGameAndUserId(gameId, userId);
      if (log) throw new Error("Log already exists");

      return await this.prismaClient.log.create(
        saveLogQuery(gameId, statusId, userId)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets a single log from the database
   * @param {number} gameId - The id of the game
   * @param {string} userId - The id of the user
   * @return {Promise<Log>} Returns the newly created log
   * @example
   * const log: Log = getByGameAndUserId(1,"1561-5646-4648-41af")
   */
  private async getByGameAndUserId(
    gameId: number,
    userId: string
  ): Promise<Log> {
    return (await this.prismaClient.log.findFirst(
      getByGameAndUserIdQuery(gameId, userId)
    )) as Log;
  }

  /**
   * Checks if the game and status exists in the database
   * @param {number} gameId - The id of the game
   * @param {number} statusId - The id of the status
   * @example
   * checkGameAndStatus(1, 3)
   */
  private async checkGameAndStatus(
    gameId: number,
    statusId: number
  ): Promise<void> {
    const game: Game = (await this.prismaClient.game.findUnique(
      getGameById(gameId)
    )) as Game;

    const status: Status = (await this.prismaClient.status.findUnique(
      getStatusById(statusId)
    )) as Status;

    if (!game) throw new Error("Game doesn't exist in db");
    else if (!status) throw new Error("Playstatus doesn't exist in db");
  }

  /**
   * Updates the status of the log in the database
   * @param {number} gameId - The id of the game
   * @param {number} statusId - The id of the status
   * @param {string} userId - The id of the user
   * @return {Promise<Log>} Returns the updated log
   * @example
   * putLog(1, 3, "1561-5646-4648-41af")
   */
  public async putLog(
    gameId: number,
    statusId: number,
    userId: string
  ): Promise<Log> {
    try {
      await this.checkGameAndStatus(gameId, statusId);

      const log: Log = await this.getByGameAndUserId(gameId, userId);
      if (!log) throw new Error("Log doesn't exists");

      return await this.prismaClient.log.update(putLogQuery(log, statusId));
    } catch (error) {
      throw error;
    }
  }
}

export default LogService;
