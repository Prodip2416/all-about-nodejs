import { FollowEntity } from './follow.entity';
import { UserEntity } from './../user/user.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileType } from "./types/profile.type";
import { Repository } from 'typeorm';
import { ProfileResponseInterface } from './types/profile.interface';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(FollowEntity)
        private readonly followRepo: Repository<FollowEntity>
    ) { }

    async getProfile(currentUserId: number, profileUserName: string): Promise<ProfileType> {
        // console.log(profileUserName);
        const user = await this.userRepo.findOne({
            username: profileUserName
        });

        if (!user) {
            throw new HttpException('User does not exit.', HttpStatus.NOT_FOUND);
        }
        // delete user.email;

        const follow = await this.followRepo.findOne({
            followerId: currentUserId,
            followingId: user.id
        })
        return { ...user, following: Boolean(follow) };
    }

    buildProfileRes(profile: ProfileType): ProfileResponseInterface {
        return { profile };
    }

    async followProfile(currentUserId: number, profileUserName: string): Promise<ProfileType> {
        const user = await this.userRepo.findOne({
            username: profileUserName
        });
        if (!user) {
            throw new HttpException('User does not exit.', HttpStatus.NOT_FOUND);
        }

        if (currentUserId === user.id) {
            throw new HttpException('Follower and following cant equal.', HttpStatus.BAD_REQUEST);
        }

        const follow = await this.followRepo.findOne({
            followerId: currentUserId,
            followingId: user.id
        });

        if (!follow) {
            const followToCreate = new FollowEntity();
            followToCreate.followerId = currentUserId;
            followToCreate.followingId = user.id;
            await this.followRepo.save(followToCreate);
        }

        return { ...user, following: true };
    }

    async unfollowProfile(currentUserId: number, profileUserName: string): Promise<ProfileType> {
        const user = await this.userRepo.findOne({
            username: profileUserName
        });
        if (!user) {
            throw new HttpException('User does not exit.', HttpStatus.NOT_FOUND);
        }

        if (currentUserId === user.id) {
            throw new HttpException('Follower and following cant equal.', HttpStatus.BAD_REQUEST);
        }

        await this.followRepo.delete({
            followerId: currentUserId,
            followingId: user.id
        })

        return { ...user, following: false };
    }
}