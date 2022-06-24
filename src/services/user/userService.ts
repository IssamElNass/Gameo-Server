import BaseService from "../baseService";
import { Error } from "../../model/error";

class UserService extends BaseService {
  constructor() {
    super();
  }

  // get one by email
  public async findOneByEmail(email: string): Promise<any> {
    const result: any = await this.db.query(
      `select exists(select 1 from gameo.users WHERE email = '${email}')`
    );
    return result.rows[0];
  }
  // get one by username
  public async findOneByUsername(username: string): Promise<any> {
    const result: any = await this.db.query(
      `select exists(select 1 from gameo.users WHERE username = '${username}')`
    );
    return result.rows[0];
  }

  public async checkIfUserExists(username: string, email: string) {
    try {
      const resultUsername: any = await this.findOneByUsername(username);
      if (resultUsername.exists)
        throw new Error("Username already exists, please use another one");
      const resultEmail: any = await this.findOneByEmail(email);
      if (resultEmail.exists)
        throw new Error(
          "Email is already linked with an account, please sign in"
        );
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
