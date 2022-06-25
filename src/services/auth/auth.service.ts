import BaseService from "../base.service";
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

  public async signIn(user: AuthSignInDTO): Promise<any> {
    const result: any = await this.getUserByEmail(user.email);
    let foundUser: any = result.rows[0];
    console.log(foundUser);

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

    return await this.db.query(
      `select id, username, email, bio, profile_picture, role, verified from gameo.users where id::text =  '${userDetails.userId}';`
    );
  }

  public async getUserByEmail(email: string): Promise<any> {
    return await this.db.query(
      `select id, username, email, password, bio, profile_picture, role, verified from gameo.users where email =  '${email}';`
    );
  }
}

export default AuthService;
