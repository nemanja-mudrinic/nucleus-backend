import { FindConditions, Repository } from "typeorm";
import { FilterableRequest } from "../dto/request/shared";

interface PaginationType {
  take?: number;
  skip?: number;
}

export class PageableRepository<T> extends Repository<T> {

  public withPagination(filter: FilterableRequest, options: any, conditions: FindConditions<T> = {}) {
    const pagination = {} as PaginationType
    if (filter.limit) {
      pagination.take = filter.limit;
    }
    if (filter.offset) {
      pagination.skip = filter.offset;
    }
    console.log({ ...pagination, ...options, where: { ...conditions } })
    return this.findAndCount({ ...pagination, ...options, where: { ...conditions } });
  }
}