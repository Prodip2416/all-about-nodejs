import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-posts.dto';

export class PatchPostDto extends CreatePostDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
