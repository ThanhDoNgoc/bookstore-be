import "reflect-metadata";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";

import { TYPES } from "../../../inversify/types";
import IBookServices from "../services/ibook-services";
import { NotFoundError } from "../../../utils/errors";
import IBook from "../models/ibook";
import HttpStatusCode from "../../../utils/http_status_codes";
import BookQuery from "../utils/ibook.query";

@injectable()
export default class BookController {
  constructor(@inject(TYPES.BookService) private bookServices: IBookServices) {}

  public async getAllBooks(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const allBook = await this.bookServices.getAll();
      response.status(HttpStatusCode.OK).json(allBook);
    } catch (error) {
      next(error);
    }
  }

  public async findBooks(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { search, category, page, limit } = request.query;
      const bookQuery = new BookQuery(page, limit, search, category);
      const books = await this.bookServices.find(bookQuery);
      response.status(HttpStatusCode.OK).json(books);
    } catch (error) {
      next(error);
    }
  }

  public async getBookById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = request.params.id;
      const book = await this.bookServices.getById(id);
      if (!book) {
        throw new NotFoundError("Book");
      }
      response.status(HttpStatusCode.OK).json(book);
    } catch (error) {
      next(error);
    }
  }

  public async updateBookById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = request.params.id;
      const book: IBook = request.body;

      const updatedBook = await this.bookServices.updateById(id, book);
      
      if (!updatedBook) throw new NotFoundError("Book");
      response
        .status(HttpStatusCode.OK)
        .json({ message: "Book updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  public async createBook(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const Book: IBook = request.body;
      await this.bookServices.create(Book);
      response
        .status(HttpStatusCode.CREATED)
        .json({ message: "Book created successfully" });
    } catch (error) {
      next(error);
    }
  }
}
