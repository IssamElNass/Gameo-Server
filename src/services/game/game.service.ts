import BaseService from "../base.service";
import { Error } from "../../model/error.model";
import {
  gameAllQuery,
  gameSingleByIdQuery,
  gameSingleBySlugQuery,
} from "../../queries/games";
import { GamesFilter } from "../../model/game.model";
import { Game } from "@prisma/client";

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
   * @return {Promise<Game[]>} Returns all the games
   * @example
   * const games: any = getAll();
   */
  public async getAll(filterOptions: GamesFilter): Promise<Game[]> {
    return await this.prismaClient.game.findMany(gameAllQuery(filterOptions));
  }

  /**
   * Gets a game by the gameId
   * @param {number} gameId - The id of the game
   * @return {Promise<Game>} Returns the game
   * @example
   * const game: any = getById(1);
   */
  public async getById(gameId: number): Promise<Game> {
    return (await this.prismaClient.game.findUnique(
      gameSingleByIdQuery(gameId)
    )) as Game;
  }

  /**
   * Gets a game by the game slug
   * @param {string} gameSlug - The slug of the game
   * @return {Promise<Game>} Returns the game
   * @example
   * const game: any = getBySlug("silly-bandz");
   */
  public async getBySlug(gameSlug: string): Promise<Game> {
    return (await this.prismaClient.game.findFirst(
      gameSingleBySlugQuery(gameSlug)
    )) as Game;
  }
}

export default GameService;
