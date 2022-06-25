import "dotenv/config";
import App from "./app";
import { getAllControllers } from "./utils/controller.utils";

const PORT: any = process.env.PORT ?? 6060;

const app = new App(getAllControllers(), PORT);

app.listen();
