import { Document } from "mongoose";

export default interface IBook extends Document {
  title: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  isDeleted?: boolean;
}
