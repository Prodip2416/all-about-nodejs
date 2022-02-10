import { FollowEntity } from './follow.entity';
import { UserEntity } from './../user/user.entity';
import { ProfileService } from './profile.service';
import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, FollowEntity])],
    controllers: [ProfileController],
    providers: [ProfileService]
})

export class ProfileModule {

}