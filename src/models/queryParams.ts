export class QueryParams {
  constructor(
    public page: number = 1,
    public limit: number = 10,
    public categoryId?: string,
    public search?: string,
  ) {}
}
