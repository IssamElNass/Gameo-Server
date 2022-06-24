import { Request, Response, NextFunction } from "express";
import { Error } from "../../model/error";

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

  // we are not using the next function to prvent from triggering
  // the default error-handler. However, make sure you are sending a
  // response to client to prevent memory leaks in case you decide to
  // NOT use, like in this example, the NextFunction .i.e., next(new Error())
  res.status((error as Error).status).send(error);
}
