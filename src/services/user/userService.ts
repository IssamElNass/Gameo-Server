import BaseService from "../baseService";
import bcrypt from "bcrypt";
import { UserRegisterDTO } from "../../model/user";

class UserService extends BaseService {
  constructor() {
    super();
  }

  public async getAll() {
    return await this.db.query("SELECT * FROM gameo.users");
  }

  public async saveUser(user: UserRegisterDTO) {
    const salt = bcrypt.genSaltSync(14);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    return await this.db.query(`INSERT INTO gameo.users(
      username, email, password, display_name
      ) VALUES(
      '${user.username}', '${user.email}','${hashedPassword}','${user.username}'
      )`);
  }
}

export default UserService;
