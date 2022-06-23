import express from "express";
import morgan from "morgan";
import Controller from "./interfaces/controller";
import pool from "./config/dbconfig";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeDatabaseConnection();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    /** Logging */
    this.app.use(morgan("dev"));
    /** Parse the request */
    this.app.use(express.urlencoded({ extended: false }));
    /** Takes care of JSON data */
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      // set the CORS policy
      res.header("Access-Control-Allow-Origin", "*");
      // set the CORS headers
      res.header(
        "Access-Control-Allow-Headers",
        "origin, X-Requested-With,Content-Type,Accept, Authorization"
      );
      // set the CORS method headers
      if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
      }
      next();
    });
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  private initializeDatabaseConnection() {
    pool.connect();
  }

  private initializeErrorHandling() {
    /** Error handling */
    this.app.use((req, res, next) => {
      const error = new Error("not found");
      return res.status(404).json({
        message: error.message,
      });
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
