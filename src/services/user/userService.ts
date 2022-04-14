import BaseService from "../baseService";

class UserService extends BaseService {
  public async getAll() {
    return await this.db.query("SELECT * FROM gameo.users");
  }

  public async saveUser() {
    return await this.db.query(`INSERT INTO gameo.users(
      username, email, password
      ) VALUES(
      'Ann', 'mroyster@royster.com', 'testpassword'
      )`);
  }
}

export default UserService;
