import BaseError from "../base.error";
import HttpStatusCode from "../http_status_codes";

export default class NotFoundError extends BaseError {
  propertyName: string;

  constructor(propertyName: string) {
    super(HttpStatusCode.NOT_FOUND, `'${propertyName}' not found.`, true);

    this.propertyName = propertyName;
  }
}
