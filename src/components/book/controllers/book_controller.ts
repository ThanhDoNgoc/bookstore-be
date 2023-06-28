import "reflect-metadata";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";

import { TYPES } from "../../../inversify/types";
import IBookServices from "../services/ibook-service";
import BookServices from "../services/book-service";
import { NotFoundError } from "../../../utils/errors";
import IBook from "../models/ibook";

@injectable()
export default class BookController {
  private _bookService: IBookServices;

  constructor(@inject(TYPES.BookService) bookServices: BookServices) {
    this._bookService = bookServices;
  }

  public async getAllBooks(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const allBook = await this._bookService.getAll();
      response.status(200).json(allBook);
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
      let id = request.params.id;
      const book = await this._bookService.getById(id);
      if (book === null) {
        throw new NotFoundError("Not found");
      }
      response(200).json(book);
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

      const updatedBook = await this._bookService.updateById(id, book);
      if (updatedBook === null) throw new NotFoundError("Not found Book");
      else return updatedBook;
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
      const createBook = await this._bookService.create(Book);
      return createBook;
    } catch (error) {
      next(error);
    }
  }
}
