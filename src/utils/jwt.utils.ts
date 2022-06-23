import { sign, SignOptions } from "jsonwebtoken";

/**
 * generates JWT used for local testing
 */
export function generateToken(userId: number, username: string): string {
  // information to be encoded in the JWT
  const payload = {
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
