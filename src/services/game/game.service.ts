import BaseService from "../base.service";
import { Error } from "../../model/error.model";
import {
  gameAllQuery,
  gameSingleByIdQuery,
  gameSingleBySlugQuery,
  gameAllGenreQuery,
  gameAllPlatformQuery,
  gameAllCompanyQuery,
} from "../../queries/games";
import { GamesFilter, GamesOtherFilter } from "../../model/game.model";
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
    const games: Game[] = await this.prismaClient.game.findMany(
      gameAllQuery(filterOptions)
    );
    if (!games) throw new Error("Games not found", 400);
    return games;
  }

  /**
   * Gets a game by the gameId
   * @param {number} gameId - The id of the game
   * @return {Promise<Game>} Returns the game
   * @example
   * const game: any = getById(1);
   */
  public async getById(gameId: number): Promise<Game> {
    const game: Game = (await this.prismaClient.game.findUnique(
      gameSingleByIdQuery(gameId)
    )) as Game;
    if (!game) throw new Error("Game not found", 400);
    return game;
  }

  /**
   * Gets a game by the game slug
   * @param {string} gameSlug - The slug of the game
   * @return {Promise<Game>} Returns the game
   * @example
   * const game: any = getBySlug("silly-bandz");
   */
  public async getBySlug(gameSlug: string): Promise<Game> {
    const game: Game = (await this.prismaClient.game.findFirst(
      gameSingleBySlugQuery(gameSlug)
    )) as Game;
    if (!game) throw new Error("Game not found", 400);
    return game;
  }

  /**
   * Gets all the games by a single genre from the database
   * @return {Promise<Game[]>} Returns all the games
   * @example
   * const games: Game[] = getAllByGenre();
   */
  public async getAllByGenre(filterOptions: GamesOtherFilter): Promise<Game[]> {
    const games: Game[] = await this.prismaClient.game.findMany(
      gameAllGenreQuery(filterOptions)
    );
    if (!games) throw new Error("Games not found", 400);
    return games;
  }

  /**
   * Gets all the games by a single platform from the database
   * @return {Promise<Game[]>} Returns all the games
   * @example
   * const games: Game[] = getAllByPlatform();
   */
  public async getAllByPlatform(
    filterOptions: GamesOtherFilter
  ): Promise<Game[]> {
    const games: Game[] = await this.prismaClient.game.findMany(
      gameAllPlatformQuery(filterOptions)
    );
    if (!games) throw new Error("Games not found", 400);
    return games;
  }

  /**
   * Gets all the games by a company from the database
   * @return {Promise<Game[]>} Returns all the games
   * @example
   * const games: Game[] = getAllByCompany();
   */
  public async getAllByCompany(
    filterOptions: GamesOtherFilter
  ): Promise<Game[]> {
    const games: Game[] = await this.prismaClient.game.findMany(
      gameAllCompanyQuery(filterOptions)
    );
    if (!games) throw new Error("Games not found", 400);
    return games;
  }
}

export default GameService;
