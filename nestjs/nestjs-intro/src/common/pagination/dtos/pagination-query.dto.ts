import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationQueryDTO {
  @IsNumber()
  @IsPositive()
  page?: number = 1;

  @IsNumber()
  @IsPositive()
  limit?: number = 10;
}
