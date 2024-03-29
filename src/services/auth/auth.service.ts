import BaseService from "../base.service";
import { Prisma, Token, User } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  AuthRegisterDTO,
  AuthSignInDTO,
  PayloadDTO,
  Tokens,
} from "../../model/auth.model";
import { generateTokens, verifyToken } from "../../utils/jwt.utils";
import { Error } from "../../model/error.model";
import { createTokenQuery, updateTokenQuery } from "../../queries/auth";

/**
 * This service takes care of the authentication.
 *
 * This includes: Logging in, registering, refreshing the access token
 */
class AuthService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Registers a new user in the database
   * @param {AuthRegisterDTO} user - The user
   * @return {Promise<Tokens>} Return the access and refresh token
   * @example
   * const user: AuthRegisterDTO = {username: 'bondi', email: 'bondi@gameo.io', password: 'test'};
   * registerUser(user);
   */
  public async saveUser(user: AuthRegisterDTO): Promise<Tokens> {
    // Hash Password
    const hashedPassword = bcrypt.hashSync(user.password, 14);

    // Create input model to add a new user
    let userInput: Prisma.UserCreateInput = {
      email: user.email,
      username: user.username,
      password: hashedPassword,
    };

    // Create the user
    const createdUser = await this.prismaClient.user.create({
      data: userInput,
    });

    // Create payload
    const payload: PayloadDTO = {
      userId: createdUser.id,
      username: createdUser.username,
    };

    // Create the access and refresh token
    const tokens: Tokens = generateTokens(payload);

    const createdToken: Token = await this.saveToken(
      createdUser,
      tokens.refresh_token
    );

    if (!createdToken)
      throw new Error(
        "Something went wrong with adding the token into the database"
      );

    // return the token
    return tokens;
  }

  /**
   * Checks if the user password matches the incoming password, signs the user in
   * @param {AuthSignInDTO} userAuth - The user
   * @return {Promise<Tokens>} Return the access and refresh token
   * @example
   * const userAuth: AuthSignInDTO = {email: 'bondi@gameo.io', password: 'test'};
   * signIn(user);
   */
  public async signUserIn(userAuth: AuthSignInDTO): Promise<Tokens | null> {
    const foundUser: User = await this.getByEmail(userAuth.email);

    if (
      foundUser &&
      (await bcrypt.compare(userAuth.password, foundUser.password))
    ) {
      const payload: PayloadDTO = {
        username: foundUser.username,
        userId: foundUser.id,
      };

      // Create token
      const tokens: Tokens = generateTokens(payload);

      const result: Token = (await this.prismaClient.token.findUnique({
        where: {
          userId: foundUser.id,
        },
      })) as Token;

      if (result) {
        const updatedToken = await this.putToken(
          foundUser,
          tokens.refresh_token
        );

        if (!updatedToken)
          throw new Error(
            "Something went wrong with updating the token into the database"
          );
      } else {
        const createdToken = await this.saveToken(
          foundUser,
          tokens.refresh_token
        );

        if (!createdToken)
          throw new Error(
            "Something went wrong with adding the token into the database"
          );
      }

      return tokens;
    }
    throw new Error("Login failed, please check your e-mail and password", 403);
  }

  /**
   * Checks if the user password matches the incoming password, signs the user in
   * @param {string} token - The refresh token
   * @return {Promise<Tokens>} Returns the access and refresh token
   * @example
   * refreshToken("dsnkkdsnfkjndsfkndskjfndsk");
   */
  public async refreshToken(token: string): Promise<Tokens> {
    const payload: PayloadDTO = verifyToken(
      token,
      process.env.REFRESH_SECRET as string
    );

    if (!payload) throw new Error("Not valid", 400);

    const result = await this.prismaClient.token.findUnique({
      where: {
        userId: payload.userId,
      },
    });

    if (result && (await bcrypt.compare(token, result.token))) {
      // check expiry date
      if (new Date() > result.expires_at)
        throw new Error("Refresh token is expired, please sign in again");
      // Create token
      const tokens: Tokens = generateTokens(payload);

      this.putToken(payload.userId, tokens.refresh_token);

      return tokens;
    }

    throw new Error("Please sign in again", 403);
  }

  /**
   * Gets the user by using their e-mail
   * @param {string} email - The e-mail address
   * @return {Promise<User>} Returns the found user
   * @example
   * getByEmail("bondi@gameo.io");
   */
  public async getByEmail(email: string): Promise<User> {
    return (await this.prismaClient.user.findUnique({
      where: {
        email: email,
      },
    })) as User;
  }

  /**
   * Adds the refresh token to the database
   * @param {User} user - The user
   * @param {string} refresh_token - The refresh token of the user
   * @return {Promise<Token>} Returns the added refresh token in the database
   * @example
   * addTokenToDatabase(user, 'dfnsdfjsdnfjsndfkjdnsfkn');
   */
  public async saveToken(user: User, refresh_token: string): Promise<Token> {
    return await this.prismaClient.token.create(
      createTokenQuery(user, refresh_token)
    );
  }

  /**
   * Updates the refresh token in the database
   * @param {User | string} user - The user or userId
   * @param {string} refresh_token - The refresh token of the user
   * @return {Promise<Token>} Returns the added refresh token in the database
   * @example
   * updateTokenInDatabase("sfdsdsfds-dsfdsfdsfdsf-dsfdsfsdf", 'dfnsdfjsdnfjsndfkjdnsfkn');
   */
  public async putToken(
    user: User | string,
    refresh_token: string
  ): Promise<Token> {
    const userId: string = typeof user === "string" ? user : user.id;

    return await this.prismaClient.token.update(
      updateTokenQuery(userId, refresh_token)
    );
  }
}

export default AuthService;
