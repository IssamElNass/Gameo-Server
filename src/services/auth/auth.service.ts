import BaseService from "../base.service";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  AuthRegisterDTO,
  AuthSignInDTO,
  PayloadDTO,
} from "../../model/auth.model";
import { generateTokens, verifyToken } from "../../utils/jwt.utils";
import { Error } from "../../model/error.model";

class AuthService extends BaseService {
  constructor() {
    super();
  }

  public async registerUser(registerUser: AuthRegisterDTO): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const hashedPassword = bcrypt.hashSync(registerUser.password, 14);
    let user: Prisma.UserCreateInput = {
      email: registerUser.email,
      username: registerUser.username,
      password: hashedPassword,
    };

    const createdUser = await this.prismaClient.user.create({ data: user });
    // Create the jwt token
    const tokens: {
      access_token: string;
      refresh_token: string;
    } = generateToken(createdUser.id, createdUser.username);
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);

    await this.prismaClient.token.create({
      data: {
        token: tokens.refresh_token,
        userId: createdUser.id,
        expires_at: expireDate,
      },
    });

    // return the token
    return tokens;
  }

  public async signIn(user: AuthSignInDTO): Promise<any> {
    const result: any = await this.getUserByEmail(user.email);
    let foundUser: any = result;

    if (
      foundUser &&
      (await bcrypt.compare(user.password, foundUser.password))
    ) {
      // Create token
      const tokens: {
        access_token: string;
        refresh_token: string;
      } = generateToken(foundUser.id, foundUser.username);
      foundUser.access_token = tokens.access_token;
      foundUser.refresh_token = tokens.refresh_token;

      const result = await this.prismaClient.token.findUnique({
        where: {
          userId: foundUser.id,
        },
      });

      let expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);

      if (result) {
        await this.prismaClient.token.update({
          where: {
            userId: foundUser.id,
          },
          data: {
            token: tokens.refresh_token,
            expires_at: expireDate,
          },
        });
      } else {
        await this.prismaClient.token.create({
          data: {
            token: tokens.refresh_token,
            userId: foundUser.id,
            expires_at: expireDate,
          },
        });
      }

      return foundUser;
    }
    // return the token
    return null;
  }

  public async refreshToken(token: string): Promise<any> {
    const payload: PayloadDTO = verifyRefreshToken(token);
    if (!payload) throw new Error("error not valid", 400);

    const result = await this.prismaClient.token.findUnique({
      where: {
        token: token,
        userId: payload.userId,
      },
    });

    if (result && (await bcrypt.compare(result.token, token))) {
      // check expiry date

      // Create token
      const tokens: {
        access_token: string;
        refresh_token: string;
      } = generateToken(payload.userId, payload.username);

      let expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);

      await this.prismaClient.token.update({
        where: {
          token: token,
          userId: payload.userId,
        },
        data: {
          token: tokens.refresh_token,
          expires_at: expireDate,
        },
      });

      return tokens;
    }

    // return the token
    return null;
  }

  public async getUserByToken(token: string): Promise<any> {
    const userDetails: PayloadDTO = verifyToken(token);
    const result: any = await this.prismaClient.user.findUnique({
      where: {
        id: userDetails.userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        profile_picture: true,
        role: true,
        verified: true,
      },
    });
    return result;
  }

  public async getUserByEmail(email: string): Promise<any> {
    return await this.prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}

export default AuthService;
