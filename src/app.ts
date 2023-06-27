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

    this.app.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }

  private initMiddleware() {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use((err, req, res, next) => {
      console.log(err)
      res.status(500).json("hehe")
    });
  }

  private initRoutes() {
    const bookController = container.resolve<BookController>(BookController);

    this.app.get("", bookController.getAllBooks.bind(bookController));
    this.app.get("/:id", bookController.getBookById.bind(bookController));
  }
}
