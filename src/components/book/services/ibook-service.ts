import IBook from "../models/ibook";

export default interface IBookServices {
  create(Book: IBook): Promise<IBook>;
  getAll(): Promise<IBook[]>;
  getById(_id: string): Promise<IBook | null>;
  updateById(_id: string, Book: IBook): Promise<Boolean | null>;
  delete(_id: string): Promise<IBook>;
}
