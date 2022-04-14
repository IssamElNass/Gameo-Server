import { Request, Response, NextFunction } from "express";
import { getAllUsers, addUser } from "../services/userService";
import { User, UserRegisterDTO } from "../model/user";
import validateParams from "../utils/validateParams";

// getting all posts
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const test: any = await getAllUsers();
  console.log(test);

  return res.status(200).json({
    message: test.rows,
  });
};

const validatorObject: UserRegisterDTO = {
  username: "",
  email: "string",
  password: "string",
};

// adding a post
const addNewUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!validateParams(req.body, validatorObject))
    res.status(400).send("Invalid body");

  // get the data from req.body
  let newUser = req.body;
  console.log(newUser);

  //await addUser();
  // return response
  return res.status(200).json({
    message: "ok",
  });
};

export default { getUsers, addNewUser };
