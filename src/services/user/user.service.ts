import BaseService from "../base.service";
import { Error } from "../../model/error.model";
import { User } from "@prisma/client";
import { PayloadDTO } from "../../model/auth.model";
import { verifyToken } from "../../utils/jwt.utils";
import { getByAccessTokenQuery } from "../../queries/me";

/**
 * This service takes care of the users in the db.
 *
 * This includes: Saving an user, Getting an user, updating an user
 */
class UserService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Gets all users from the database
   * @return {Promise<User[]>} Returns array of users
   * @example
   * getAll()
   */
  public async getAll(): Promise<User[]> {
    const users: User[] = (await this.prismaClient.user.findMany({
      select: {
        id: true,
        username: true,
        profile_picture: true,
        bio: true,
      },
      take: 5,
    })) as User[];
    if (!users) throw new Error("Users not found", 400);
    return users;
  }

  /**
   * Get user by email
   * @param {string} email - The e-mail of the user
   * @return {Promise<User>} Returns the found user
   * @example
   * getByEmail("bondi@gameo.io")
   */
  public async getByEmail(email: string): Promise<User> {
    const user: User = (await this.prismaClient.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        profile_picture: true,
        bio: true,
      },
    })) as User;
    if (!user) throw new Error("User not found", 400);
    return user;
  }

  /**
   * Get user by username
   * @param {string} username - The username of the user
   * @return {Promise<User>} Returns the found user
   * @example
   * getByUsername("bondi")
   */
  public async getByUsername(username: string): Promise<User> {
    const user: User = (await this.prismaClient.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        profile_picture: true,
        bio: true,
      },
    })) as User;
    if (!user) throw new Error("User not found", 400);
    return user;
  }

  /**
   * Gets the user by using their access token
   * @param {string} token - The access token
   * @return {Promise<User>} Returns the found user
   * @example
   * getUserByToken("dsnkkdsnfkjndsfkndskjfndsk");
   */
  public async getUserByToken(token: string): Promise<User> {
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

  /**
   * Checks if the user already exists in the database
   * @param {string} username - The username of the user
   * @param {string} email - The e-mail of the user
   * @return {Promise<User>} Returns the found user
   * @example
   * checkIfUserExists("bondi", "bondi@gameo.io")
   */
  public async checkIfUserExists(
    username: string,
    email: string
  ): Promise<void> {
    try {
      const resultUsername: User = await this.getByUsername(username);
      if (resultUsername)
        throw new Error("Username already exists, please use another one");
      const resultEmail: User = await this.getByEmail(email);
      if (resultEmail)
        throw new Error(
          "Email is already linked with an account, please sign in"
        );
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
