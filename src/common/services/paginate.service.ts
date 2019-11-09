import { Injectable } from '@nestjs/common';
import { Pager } from '../models/pager.model';

@Injectable()
export class PaginateService {
  paginate<T>(data: T[], count: number, page: number, limit: number): Pager<T> {
    const totalPages = Math.ceil(count / limit);

    return {
      page,
      limit,
      totalPages,
      count,
      data,
    };
  }
}
