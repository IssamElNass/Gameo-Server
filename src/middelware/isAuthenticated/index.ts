import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("test");

  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (authHeader == null || authHeader == undefined) {
    console.log("return unauthorized");
    return res.status(401);
  }

  const token: string = authHeader.split(" ")[1];
  if (token == null || authHeader == undefined) return res.status(401);
  if (process.env.TOKEN_SECRET == null || authHeader == undefined)
    return res.status(401);
  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);

      if (err) return res.status(403);

      next();
    }
  );
};
