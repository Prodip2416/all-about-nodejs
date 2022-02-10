import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports:[UserService]
})
export class UserModule { }