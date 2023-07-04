import "reflect-metadata";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";

import { TYPES } from "../../../inversify/types";
import HttpStatusCode from "../../../utils/http_status_codes";
import IOrderService from "../services/iorder-services";
import IOrderItems from "../utils/order-params";

@injectable()
export default class OrderController {
  constructor(
    @inject(TYPES.OrderService) private orderServices: IOrderService
  ) {}

  public async createOrder(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const orderItems: IOrderItems = request.body;
      await this.orderServices.createOrder(orderItems);
      response
        .status(HttpStatusCode.CREATED)
        .json({ message: "Order created successfully" });
    } catch (error) {
      next(error);
    }
  }
}
