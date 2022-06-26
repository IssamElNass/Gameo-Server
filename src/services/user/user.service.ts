import BaseService from "../base.service";
import { Error } from "../../model/error.model";

class UserService extends BaseService {
  constructor() {
    super();
  }

  public async getAllUsers(): Promise<any> {
    const result: any = await this.prismaClient.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        profile_picture: true,
        bio: true,
      },
    });
    // await this.db.query(
    //   `select exists(select 1 from gameo.users WHERE email = '${email}')`
    // );
    return result;
  }

  // get one by email
  public async findOneByEmail(email: string): Promise<any> {
    const result: any = await this.prismaClient.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
    return result;
  }
  // get one by username
  public async findOneByUsername(username: string): Promise<any> {
    const result: any = await this.prismaClient.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
      },
    });
    return result;
  }

  public async checkIfUserExists(username: string, email: string) {
    try {
      const resultUsername: any = await this.findOneByUsername(username);
      if (resultUsername)
        throw new Error("Username already exists, please use another one");
      const resultEmail: any = await this.findOneByEmail(email);
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
