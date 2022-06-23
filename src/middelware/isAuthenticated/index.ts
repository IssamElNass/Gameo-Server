import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const authHeader = req.headers["authorization"];
  if (authHeader == null || authHeader == undefined) {
    console.log("return unauthorized");
    return res.status(401).json({
      status: "UNAUTHORIZED",
    });
  }

  const token: string = authHeader.split(" ")[1];
  if (token == null || authHeader == undefined)
    return res.status(401).json({
      status: "UNAUTHORIZED",
    });
  if (process.env.TOKEN_SECRET == null || authHeader == undefined)
    return res.status(401).json({
      status: "UNAUTHORIZED",
    });
  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);

      if (err)
        return res.status(403).json({
          status: "FORBIDDEN",
        });

      next();
    }
  );
}
