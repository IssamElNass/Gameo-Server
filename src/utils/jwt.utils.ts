import { sign, SignOptions, verify, decode } from "jsonwebtoken";
import { PayloadDTO } from "../model/auth.model";

/**
 * generates JWT
 */
export function generateToken(
  userId: string,
  username: string
): {
  access_token: string;
  refresh_token: string;
} {
  // information to be encoded in the JWT
  const payload: PayloadDTO = {
    username: username,
    userId: userId,
  };
  // read private key value
  let privateTokenKey: string = "";
  if (process.env.TOKEN_SECRET) privateTokenKey = process.env.TOKEN_SECRET;

  let privateRefreshKey: string = "";
  if (process.env.REFRESH_SECRET)
    privateRefreshKey = process.env.REFRESH_SECRET;

  const signInOptions: SignOptions = {
    expiresIn: "15m",
  };

  const refreshOptions: SignOptions = {
    expiresIn: "7d",
  };

  const access_token: string = sign(payload, privateTokenKey, signInOptions);
  const refresh_token: string = sign(
    payload,
    privateRefreshKey,
    refreshOptions
  );

  // generate JWT
  return {
    access_token: access_token,
    refresh_token: refresh_token,
  };
}

export function verifyToken(token: string): PayloadDTO {
  let payload: PayloadDTO;
  let data: any = verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, data: any) => {
      payload = {
        userId: data.userId,
        username: data.username,
      };
      if (err) console.error("ERROR");
      return data;
    }
  );
  payload = {
    userId: data.userId,
    username: data.username,
  };
  return payload;
}

export function verifyRefreshToken(token: string): PayloadDTO {
  let payload: PayloadDTO;
  let data: any = verify(
    token,
    process.env.REFRESH_SECRET as string,
    (err: any, data: any) => {
      payload = {
        userId: data.userId,
        username: data.username,
      };
      if (err) console.error("ERROR");
      return data;
    }
  );
  payload = {
    userId: data.userId,
    username: data.username,
  };
  return payload;
}
