import { injectable } from "inversify";
import IOrderService from "./iorder-services";
import Book from "../../book/models/book-model";
import OrderItems from "../utils/order-params";

@injectable()
export default class OrderService implements IOrderService {
  async createOrder(orderItems: OrderItems): Promise<void> {
    const updateBooks = orderItems.items.map((book) => {
      Book.findByIdAndUpdate(
        { _id: book.id, quantity: { $gte: book.quantity } },
        {
          quantity: { $inc: -book.quantity },
        }
      );
    });

    await Promise.all(updateBooks);
    //Kafka....
  }
}
