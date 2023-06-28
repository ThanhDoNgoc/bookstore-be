import { model, Schema } from "mongoose";
import IBook from "./ibook";
import { Category } from "../utils/category.enum";

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true, maxlength: 60 },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: Category,
      default: Category.Comedy,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Book = model<IBook>("Book", BookSchema);
export default Book;
