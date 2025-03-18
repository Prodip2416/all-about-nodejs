import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDTO } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { URL } from 'url';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    query: PaginationQueryDTO,
    queryBuilder: SelectQueryBuilder<T>,
  ): Promise<Paginated<T>> {
    const { page, limit } = query;
    const take = limit;
    const skip = (page - 1) * limit;
    const [result, totalItems] = await queryBuilder
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const baseUrl =
      this.request.protocol + '://' + this.request.get('host') + '/';
    const newUrl = new URL(this.request.url, baseUrl);

    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const finalResponse: Paginated<T> = {
      data: result,
      meta: {
        totalItems,
        itemCount: result.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?page=1&limit=${limit}`,
        previous: prevPage
          ? `${newUrl.origin}${newUrl.pathname}?page=${prevPage}&limit=${limit}`
          : null,
        next: nextPage
          ? `${newUrl.origin}${newUrl.pathname}?page=${nextPage}&limit=${limit}`
          : null,
        last: `${newUrl.origin}${newUrl.pathname}?page=${totalPages}&limit=${limit}`,
        current: `${newUrl.origin}${newUrl.pathname}?page=${page}&limit=${limit}`,
      },
    };

    return finalResponse;
  }
}
