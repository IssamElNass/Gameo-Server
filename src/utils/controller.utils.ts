import UserController from "../controllers/user/user.controller";
import AuthController from "../controllers/authentication/auth.controller";
import MeController from "../controllers/authentication/me.controller";

export function getAllControllers(): any[] {
  return [new UserController(), new AuthController(), new MeController()];
}
