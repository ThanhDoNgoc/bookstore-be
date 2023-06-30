import IBook from "../models/ibook";
import BookQuery from "../utils/ibook.query";

export default interface IBookServices {
  create(book: IBook): Promise<IBook>;
  getAll(): Promise<IBook[]>;
  find(query: BookQuery): Promise<{ books: IBook[], total: number}>;
  getById(_id: string): Promise<IBook | null>;
  updateById(_id: string, book: IBook): Promise<Boolean | null>;
  delete(_id: string): Promise<IBook>;
}
