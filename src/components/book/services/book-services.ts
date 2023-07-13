import { injectable } from "inversify";
import IBookServices from "./ibook-services";
import Book from "../models/book-model";
import IBook from "../models/ibook";
import BookQuery from "../utils/ibook.query";
import KafkaService from "../../../kafka/kafka.services";
import { KafkaTopics } from "../../../kafka/topics";

@injectable()
export default class BookServices implements IBookServices {
  private kafkaService = KafkaService.getInstance();

  async create(book: IBook): Promise<IBook> {
    const newBook = await Book.create(book);

    this.kafkaService.sendMessage(KafkaTopics.Book, {
      book: {
        title: newBook.title,
        image: newBook.image,
        quantity: newBook.quantity,
        price: newBook.price,
        description: newBook.description,
        category: newBook.category,
        isDeleted: newBook.isDeleted,
        _id: newBook._id.toString(),
      },
      type: "create",
    });
    return newBook;
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
    const updateBook = await Book.findByIdAndUpdate(_id, book);
    this.kafkaService.sendMessage(KafkaTopics.Book, {
      book: {
        title: updateBook.title,
        image: updateBook.image,
        quantity: updateBook.quantity,
        price: updateBook.price,
        description: updateBook.description,
        category: updateBook.category,
        isDeleted: updateBook.isDeleted,
        _id: updateBook._id.toString(),
      },
      type: "update",
    });
    return updateBook ? true : false;
  }

  async delete(_id: string): Promise<IBook> {
    throw new Error("Method not implemented.");
  }
}
