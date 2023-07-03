import { injectable } from "inversify";
import IBookServices from "./ibook-services";
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

  async find(query: BookQuery): Promise<{ books: IBook[]; total: number }> {
    const queryPipe: any[] = [];

    if (query.search) {
      queryPipe.push({
        $match: { title: { $regex: query.search, $options: "i" } },
      });
    }

    if (query.category[0]) {
      queryPipe.push({ $match: { category: { $in: query.category } } });
    }

    queryPipe.push({
      $facet: {
        books: [
          { $skip: query.page * query.limit },
          { $limit: query.limit },
          { $project: { _id: 1, title: 1, price: 1, category: 1, image: 1 } },
        ],
        count: [{ $count: "total" }],
      },
    });

    const results = await Book.aggregate(queryPipe);

    return {
      books: results[0].books,
      total: results[0].count[0] ? results[0].count[0].total : 0,
    };
  }

  async getById(id: string): Promise<IBook | null> {
    return await Book.findOne({ _id: id });
  }

  async updateById(_id: string, book: IBook): Promise<Boolean | null> {
    return await Book.findByIdAndUpdate(_id, book);
  }

  async delete(_id: string): Promise<IBook> {
    throw new Error("Method not implemented.");
  }
}
