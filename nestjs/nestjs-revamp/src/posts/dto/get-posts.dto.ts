import { IntersectionType } from "@nestjs/mapped-types";
import { IsDate, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";

export class GetBasePostDto {
  @IsOptional()
  @IsDate()
  startdate: Date;

  @IsOptional()
  @IsDate()
  enddate: Date;
}
export class GetPostsQueryDto extends IntersectionType(
  PaginationQueryDto,
  GetBasePostDto,
) {}