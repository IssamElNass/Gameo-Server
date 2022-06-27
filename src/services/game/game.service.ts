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
        platforms: {
          select: {
            release: true,
            name: {
              select: {
                name: true,
              },
            },
          },
        },
      },
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
        platforms: {
          select: {
            release: true,
            name: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return result;
  }
}

export default GameService;
