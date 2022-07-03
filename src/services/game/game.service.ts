import BaseService from "../base.service";
import { Error } from "../../model/error.model";

class GameService extends BaseService {
  constructor() {
    super();
  }

  public async getAllGames(): Promise<any> {
    const result: any = await this.prismaClient.game.findMany({
      include: {
        screenshots: {
          select: {
            id: true,
            caption: true,
            url: true,
          },
        },
        videos: {
          select: {
            id: true,
            caption: true,
            url: true,
          },
        },
        companies: {
          select: {
            developer: true,
            publisher: true,
            company: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
        platforms: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        releases: {
          select: {
            region: true,
            release_human: true,
            platform: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      take: 10,
    });
    return result;
  }

  public async findOneById(id: number): Promise<any> {
    const result: any = await this.prismaClient.game.findUnique({
      where: {
        id: id,
      },
      include: {
        screenshots: {
          select: {
            id: true,
            caption: true,
            url: true,
          },
        },
        videos: {
          select: {
            id: true,
            caption: true,
            url: true,
          },
        },
        companies: {
          select: {
            developer: true,
            publisher: true,
            company: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
        platforms: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        releases: {
          select: {
            region: true,
            release_human: true,
            platform: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });
    return result;
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
