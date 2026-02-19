import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class SingleUserDTO {
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class UserParamDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(1000)
  page: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit: number;
}
