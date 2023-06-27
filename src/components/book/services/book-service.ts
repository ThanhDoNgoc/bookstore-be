import { injectable } from "inversify";
import IBookServices from "./ibook-service";
import Book from "../models/book-model";
import IBook from "../models/ibook";

@injectable()
export default class BookServices implements IBookServices {
  async create(book: IBook): Promise<IBook> {
    try {
      return await Book.create(book);
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<IBook[]> {
    try {
      return await Book.find();
    } catch (error) {
      throw error;
    }
  }

  async getById(_id: string): Promise<IBook | null> {
    try {
      return await Book.findById(_id);
    } catch (error) {
      throw error;
    }
  }

  async updateById(_id: string, book: IBook): Promise<Boolean | null> {
    try {
      return await Book.findByIdAndUpdate(_id, book);
    } catch (error) {
      throw error;
    }
  }

  async delete(_id: string): Promise<IBook> {
    throw new Error("Method not implemented.");
  }
}
