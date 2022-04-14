import Pool from "../config/dbconfig";
import { QueryResult } from "pg";

const getAllUsers = (): Promise<QueryResult> => {
  return Pool.query("SELECT * FROM gameo.users");
};

const addUser = (): void => {
  var queryString = `INSERT INTO gameo.users(
        username, email, password
        ) VALUES(
        'Ann', 'mroyster@royster.com', 'testpassword'
        )`;

  Pool.query(queryString, (err, res) => {
    console.log(res);
  });
};

export { getAllUsers, addUser };
