import "dotenv/config";
import App from "./app";
import UserController from "./controllers/user/user.controller";
import AuthController from "./controllers/authentication/auth.controller";

const PORT: any = process.env.PORT ?? 6060;

const app = new App([new UserController(), new AuthController()], PORT);

app.listen();
