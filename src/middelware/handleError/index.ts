import { Request, Response, NextFunction } from "express";
import { Error } from "../../model/error.model";

// Check if user is authenticated
export default function handleError(
  err: TypeError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  let error = err;

  if (!(err instanceof Error)) {
    error = new Error(
      "Oh no, this is embarrasing. We are having troubles my friend"
    );
  }

  res.status((error as Error).status).send(error);
}
