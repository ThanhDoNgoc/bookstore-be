import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
import { checkSchema } from "express-validator";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import * as fs from "fs";
import DatabaseConnection from "./database/db.connect";
import container from "./inversify/inversify.config";
import BookController from "./components/book/controllers/book-controller";
import {
  bookQueryValidator,
  createBookValidation,
  editBookValidation,
  getBookDetailValidation,
} from "./utils/validators";
import validate from "./utils/middlewares/validator.middleware";
import HttpStatusCode from "./utils/http_status_codes";
import BaseError from "./utils/errors/base.error";
import OrderController from "./components/order/controllers/order-controller";
import KafkaService from "./kafka/kafka.services";

export default class App {
  private dbConnection: DatabaseConnection = DatabaseConnection.getInstance();
  private kafka: KafkaService = KafkaService.getInstance();

  private app: Express;
  private port = process.env.PORT || 3000;

  constructor(_app: Express) {
    this.app = _app;
  }

  public async start() {
    await this.dbConnection.connect();
    await this.kafka.connect();
    
    this.initMiddleware();
    this.initRoutes();
    this.initGlobalErrorHandler();
    this.initSwagger();

    this.app.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }

  private initMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes() {
    //Should have a file holding all book router but I'm kind of lazy so
    const bookController = container.get(BookController);
    const orderController = container.get(OrderController);

    this.app.post(
      "/api/order",
      orderController.createOrder.bind(orderController)
    );

    this.app.get("/api/all", bookController.getAllBooks.bind(bookController));

    this.app.get(
      "/api",
      checkSchema(bookQueryValidator),
      validate,
      bookController.findBooks.bind(bookController)
    );

    this.app.get(
      "/api/:id",
      checkSchema(getBookDetailValidation),
      validate,
      bookController.getBookById.bind(bookController)
    );

    this.app.post(
      "/api",
      checkSchema(createBookValidation),
      validate,
      bookController.createBook.bind(bookController)
    );

    this.app.put(
      "/api/:id",
      checkSchema(editBookValidation),
      validate,
      bookController.updateBookById.bind(bookController)
    );
  }

  private initGlobalErrorHandler() {
    this.app.use((err, req, res, next) => {
      console.log(err);
      if (err instanceof BaseError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
      }

      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    });
  }

  private initSwagger() {
    const apiDocument = fs.readFileSync("./src/swagger/openapi.yaml", "utf8");
    const swaggerDocument = YAML.parse(apiDocument);
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }
}
