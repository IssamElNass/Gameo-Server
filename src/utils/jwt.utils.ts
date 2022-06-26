import { sign, SignOptions, verify, decode } from "jsonwebtoken";
import { PayloadDTO } from "../model/auth.model";

/**
 * generates JWT
 */
export function generateToken(userId: string, username: string): string {
  // information to be encoded in the JWT
  const payload: PayloadDTO = {
    username: username,
    userId: userId,
  };
  // read private key value
  let privateKey: string = "";
  if (process.env.TOKEN_SECRET) privateKey = process.env.TOKEN_SECRET;

  const signInOptions: SignOptions = {
    expiresIn: "1h",
  };

  // generate JWT
  return sign(payload, privateKey, signInOptions);
}

export function verifyToken(token: string): PayloadDTO {
  let payload: PayloadDTO;
  let test: any = verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, data: any) => {
      console.log(err);

      payload = {
        userId: data.userId,
        username: data.username,
      };
      if (err) console.error("ERROR");
      return data;
    }
  );
  payload = {
    userId: test.userId,
    username: test.username,
  };
  return payload;
}
