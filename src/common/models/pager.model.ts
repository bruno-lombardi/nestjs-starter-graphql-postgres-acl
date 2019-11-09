export class Pager<T> {
  page: number;
  limit: number;
  totalPages: number;
  count: number;
  data: T[];
}
