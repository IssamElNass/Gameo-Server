import BaseService from "../baseService";
import bcrypt from "bcrypt";
import { AuthRegisterDTO, PayloadDTO } from "../../model/auth";
import { generateToken, verifyToken } from "../../utils/jwt.utils";

class AuthService extends BaseService {
  constructor() {
    super();
  }

  public async registerUser(user: AuthRegisterDTO): Promise<string> {
    const hashedPassword = bcrypt.hashSync(user.password, 14);

    const data = await this.db.query(`INSERT INTO gameo.users(
      username, email, password
      ) VALUES(
      '${user.username}', '${user.email.toLowerCase()}','${hashedPassword}'
      ) RETURNING id, username`);

    // Create the jwt token
    const token: string = generateToken(data.rows[0].id, data.rows[0].username);

    // return the token
    return token;
  }

  public async getUserByToken(token: string): Promise<any> {
    const userDetails: PayloadDTO = verifyToken(token);

    return await this.db.query(
      `select id, username, email, bio, profile_picture, role, verified from gameo.users where id::text =  '${userDetails.userId}';`
    );
  }
}

export default AuthService;
