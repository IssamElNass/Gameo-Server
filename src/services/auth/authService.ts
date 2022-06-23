import BaseService from "../baseService";
import bcrypt from "bcrypt";
import { AuthRegisterDTO } from "../../model/auth";

class AuthService extends BaseService {
  constructor() {
    super();
  }

  public async registerUser(user: AuthRegisterDTO) {
    const hashedPassword = bcrypt.hashSync(user.password, 14);

    return await this.db.query(`INSERT INTO gameo.users(
      username, email, password
      ) VALUES(
      '${user.username}', '${user.email.toLowerCase()}','${hashedPassword}'
      )`);
  }
}

export default AuthService;
