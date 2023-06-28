import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
import DatabaseConnection from "./database/db.connect";
import container from "./inversify/inversify.config";
import BookController from "./components/book/controllers/book_controller";

export default class App {
  private dbConnection: DatabaseConnection = DatabaseConnection.getInstance();

  private app: Express;
  private port = process.env.PORT || 3000;

  constructor(_app: Express) {
    this.app = _app;
  }

  public async start() {
    await this.dbConnection.connect();

    this.initMiddleware();
    this.initRoutes();
    this.initGlobalErrorHandler();

    this.app.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }

  private initMiddleware() {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes() {
    //Should have a file holding all book router but I'm kind of lazy so
    const bookController = container.resolve<BookController>(BookController);

    this.app.get("", bookController.getAllBooks.bind(bookController));
    this.app.get("/:id", bookController.getBookById.bind(bookController));
  }

  private initGlobalErrorHandler() {
    this.app.use((err, req, res, next) => {
      if (err.statusCode && err.message) {
        res.status(err.status).json({ message: err.message });
      }

      res.status(500).json({ message: "Internal server error" });
    });
  }
}
