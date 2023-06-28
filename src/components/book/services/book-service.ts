import { injectable } from "inversify";
import IBookServices from "./ibook-service";
import Book from "../models/book-model";
import IBook from "../models/ibook";
import BookQuery from "../utils/ibook.query";

@injectable()
export default class BookServices implements IBookServices {
  async create(book: IBook): Promise<IBook> {
    return await Book.create(book);
  }

  async getAll(): Promise<IBook[]> {
    return await Book.find();
  }

  async find(query: BookQuery): Promise<IBook[]> {
    const queryObject: any = {};
    if (query.searchKey) {
      queryObject.title = { $regex: query.searchKey, $option: "i" };
    }

    if (query.category && query.category.length > 0) {
      queryObject.category = { $in: query.category };
    }

    return await Book.find(queryObject);
  }

  async getById(_id: string): Promise<IBook | null> {
    return await Book.findById(_id);
  }

  async updateById(_id: string, book: IBook): Promise<Boolean | null> {
    return await Book.findByIdAndUpdate(_id, book);
  }

  async delete(_id: string): Promise<IBook> {
    throw new Error("Method not implemented.");
  }
}
