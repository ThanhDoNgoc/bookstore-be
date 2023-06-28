import BaseError from "../base.error";
import HttpStatusCode from "../../http_status_codes";

export default class InternalServerError extends BaseError {
  constructor(message: any) {
    super(HttpStatusCode.INTERNAL_SERVER_ERROR, message, false);
  }
}
