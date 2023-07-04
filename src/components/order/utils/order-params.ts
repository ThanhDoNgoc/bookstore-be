export default interface IOrderItems {
  items: Item[];
}

export interface Item {
  id: string;
  quantity: number;
  price: number;
}
