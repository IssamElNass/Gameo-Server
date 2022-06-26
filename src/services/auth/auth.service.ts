import BaseService from "../base.service";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  AuthRegisterDTO,
  AuthSignInDTO,
  PayloadDTO,
} from "../../model/auth.model";
import { generateToken, verifyToken } from "../../utils/jwt.utils";

class AuthService extends BaseService {
  constructor() {
    super();
  }

  public async registerUser(registerUser: AuthRegisterDTO): Promise<string> {
    const hashedPassword = bcrypt.hashSync(registerUser.password, 14);
    let user: Prisma.UserCreateInput = {
      email: registerUser.email,
      username: registerUser.username,
      password: hashedPassword,
    };

    const createdUser = await this.prismaClient.user.create({ data: user });
    // Create the jwt token
    const token: string = generateToken(createdUser.id, createdUser.username);

    // return the token
    return token;
  }

  public async signIn(user: AuthSignInDTO): Promise<any> {
    const result: any = await this.getUserByEmail(user.email);
    let foundUser: any = result;

    if (
      foundUser &&
      (await bcrypt.compare(user.password, foundUser.password))
    ) {
      // Create token
      const token: string = generateToken(foundUser.id, foundUser.username);
      foundUser.token = token;
      return foundUser;
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
