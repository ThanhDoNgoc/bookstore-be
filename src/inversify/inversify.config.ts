import "reflect-metadata";
import { Container } from "inversify";

import { TYPES } from "./types";

import IBookServices from "../components/book/services/ibook-services";
import BookServices from "../components/book/services/book-services";
import BookController from "../components/book/controllers/book-controller";
import IOrderService from "../components/order/services/iorder-services";
import OrderService from "../components/order/services/order-service";
import OrderController from "../components/order/controllers/order-controller";

const container = new Container();
container
  .bind<IBookServices>(TYPES.BookService)
  .to(BookServices)
  .inRequestScope();

container.bind<BookController>(BookController).toSelf();

container
  .bind<IOrderService>(TYPES.OrderService)
  .to(OrderService)
  .inRequestScope();
  
container.bind<OrderController>(OrderController).toSelf();

export default container;
