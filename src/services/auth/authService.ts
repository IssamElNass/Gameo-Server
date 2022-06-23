import BaseService from "../baseService";
import bcrypt from "bcrypt";
import { AuthRegisterDTO } from "../../model/auth";
import { generateToken } from "../../utils/jwt.utils";

class AuthService extends BaseService {
  constructor() {
    super();
  }

  public async registerUser(user: AuthRegisterDTO): Promise<string> {
    const hashedPassword = bcrypt.hashSync(user.password, 14);

    await this.db.query(`INSERT INTO gameo.users(
      username, email, password
      ) VALUES(
      '${user.username}', '${user.email.toLowerCase()}','${hashedPassword}'
      )`);

    // Create token
    const token: string = generateToken(1, user.username);
    // save user token
    return token;
  }
}

export default AuthService;
