import "reflect-metadata";
import { Container } from "inversify";

import { TYPES } from "./types";

import IBookServices from "../components/book/services/ibook-services";
import BookServices from "../components/book/services/book-services";
import BookController from "../components/book/controllers/book-controller";

const container = new Container();
container
  .bind<IBookServices>(TYPES.BookService)
  .to(BookServices)
  .inRequestScope();

container.bind<BookController>(BookController).toSelf();

export default container;
