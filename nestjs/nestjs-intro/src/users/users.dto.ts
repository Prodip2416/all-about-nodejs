import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class GetUserDTO {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id?: number;
}

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(3)
    first_name: string;

    @IsString()
    @IsOptional()
    last_name?: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(8)
    password: string;
}