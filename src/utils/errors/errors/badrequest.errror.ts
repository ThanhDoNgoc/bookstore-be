import BaseError from "../base.error";
import HttpStatusCode from "../http_status_codes";

export default class BadRequestError extends BaseError {
  constructor(message: any) {
    super(HttpStatusCode.BAD_REQUEST, message, true);
  }
}
