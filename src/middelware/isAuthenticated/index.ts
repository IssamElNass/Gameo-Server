import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Error } from "../../model/error.model";

// Check if user is authenticated
export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const authHeader = req.headers["authorization"];
  // Check if the header exists in the request
  if (authHeader == null || authHeader == undefined)
    throw new Error("Unauthorized", 401);

  const token: string = authHeader.split(" ")[1];
  // Check if the token is not empty
  if (token == null || authHeader == undefined)
    throw new Error("Unauthorized", 401);

  // Check if the secret token is not empty
  if (process.env.TOKEN_SECRET == null) throw new Error("Unauthorized", 401);

  // Verify the token
  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) throw new Error("Forbidden", 403);
      next();
    }
  );
}
