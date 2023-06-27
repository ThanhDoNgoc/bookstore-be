import { Document } from "mongoose";

export default interface IBook extends Document {
  name: string;
  price: number;
  quantity: number;
}
