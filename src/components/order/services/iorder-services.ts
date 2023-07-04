import OrderItems from "../utils/order-params";

export default interface IOrderService {
  createOrder(orderItems: OrderItems): Promise<void>;
}
