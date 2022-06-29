import { sign, SignOptions, verify } from "jsonwebtoken";
import { PayloadDTO, Tokens } from "../model/auth.model";
import { Error } from "../model/error.model";

const accessOptions: SignOptions = {
  expiresIn: "15m",
};

const refreshOptions: SignOptions = {
  expiresIn: "7d",
};

/**
 * Generates an access_token and a refresh token
 * @param {PayloadDTO} payload - The payload that contains the userId and username
 * @return {Tokens} Return the access and refresh token
 * @example
 * const payload: PayloadDTO = {username: 'bondi', userId: '4698d7e5-42f7-441c-a068-6619ec23bbb6'};
 * generateTokens(payload)
 */
export function generateTokens(payload: PayloadDTO): Tokens {
  // read private key tokens
  let privateAccessTokenKey: string = process.env.TOKEN_SECRET
    ? process.env.TOKEN_SECRET
    : "";
  if (!privateAccessTokenKey || privateAccessTokenKey === "")
    throw new Error("Private Access Token key is empty");

  let privateRefreshTokenKey: string = process.env.REFRESH_SECRET
    ? process.env.REFRESH_SECRET
    : "";
  if (!privateRefreshTokenKey || privateRefreshTokenKey === "")
    throw new Error("Private Refresh Token key is empty");

  // Sign the two keys
  const access_token: string = sign(
    payload,
    privateAccessTokenKey,
    accessOptions
  );
  const refresh_token: string = sign(
    payload,
    privateRefreshTokenKey,
    refreshOptions
  );

  return {
    access_token: access_token,
    refresh_token: refresh_token,
  };
}

/**
 * Verifies a token
 * @param {string} token - The access or refresh token
 * @param {string} secret - The private/secret key
 * @return {PayloadDTO} Return the payload
 * @example
 * generateTokens(token, secret)
 */
export function verifyToken(token: string, secret: string): PayloadDTO {
  let payload: any = verify(token, secret, (err: any, data: any) => {
    if (err) throw new Error(err);
    return {
      userId: data.userId,
      username: data.username,
    };
  });

  return payload as PayloadDTO;
}
