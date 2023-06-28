export default class BookQuery {
  page: number;
  limit: number;
  searchKey?: string;
  category?: string[];
  sort: "ASC" | "DSC";

  constructor(
    page?: number,
    limit?: number,
    searchKey?: string,
    category?: string[],
    sort?: "ASC" | "DSC"
  ) {
    this.page = page || 0,
    this.limit = limit || 12,
    this.searchKey = searchKey,
    this.category = category,
    this.sort = sort || 'ASC'
  }
}
