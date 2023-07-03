export default class BookQuery {
  page: number;
  limit: number;
  search?: string;
  category?: string[];
  sort: "ASC" | "DSC";

  constructor(
    page?: string,
    limit?: string,
    search?: string,
    category?: string[],
    sort?: "ASC" | "DSC"
  ) {
    this.page = +page || 0,
    this.limit = +limit || 12,
    this.search = search,
    this.category = Array.isArray(category) ? category : [category],
    this.sort = sort || 'ASC'
  }
}
