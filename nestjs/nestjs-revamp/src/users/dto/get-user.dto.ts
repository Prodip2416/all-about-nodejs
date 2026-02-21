import { IntersectionType } from '@nestjs/mapped-types';
import { IsDate, IsInt, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

export class GetBaseUserDto {
  @IsOptional()
  @IsDate()
  startdate: Date;

  @IsOptional()
  @IsDate()
  enddate: Date;
}

export class GetUsersQueryDto extends IntersectionType(
  PaginationQueryDto,
  GetBaseUserDto,
) {}

