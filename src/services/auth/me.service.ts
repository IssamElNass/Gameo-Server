import BaseService from "../base.service";
import { User } from "@prisma/client";
import { PayloadDTO } from "../../model/auth.model";
import { verifyToken } from "../../utils/jwt.utils";
import { getByAccessTokenQuery } from "../../queries/me";
import { Error } from "../../model/error.model";

/**
 * This service takes care of the your own profile.
 *
 * This includes: getting you by an access token
 */
class MeService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Gets the user by using their access token
   * @param {string} token - The access token
   * @return {Promise<User>} Returns the found user
   * @example
   * getUserByToken("dsnkkdsnfkjndsfkndskjfndsk");
   */
  public async getByAccessToken(token: string): Promise<User> {
    const userDetails: PayloadDTO = verifyToken(
      token,
      process.env.TOKEN_SECRET as string
    );
    const user: User = (await this.prismaClient.user.findUnique(
      getByAccessTokenQuery(userDetails)
    )) as User;
    if (!user) throw new Error("User not found", 400);
    return user;
  }
}

export default MeService;
