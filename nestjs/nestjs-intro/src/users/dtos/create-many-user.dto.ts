import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

export class CreateManyUserDTO {
  @ApiProperty({
    type: CreateUserDto,
    required: true,
    example: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        password: 'password1@',
      },
      {
        firstName: 'Todd',
        lastName: 'Mark',
        email: 'mark@gmail.com',
        password: 'password1@',
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
