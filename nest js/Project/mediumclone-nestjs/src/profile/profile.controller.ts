import { ProfileService } from './profile.service';
import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { User } from "src/user/decorators/user.decorators";
import { ProfileResponseInterface } from "./types/profile.interface";
import { AuthGuard } from 'src/user/guerds/auth.guard';

@Controller('profile')
export class ProfileController{
    
    constructor(private readonly profileService:ProfileService){}

    @Get(':username')
    async getProfile(@User('id') currentUserId:number, @Param('username') profileUserName:string):
    Promise<ProfileResponseInterface>
    {   
        const profile = await this.profileService.getProfile(currentUserId, profileUserName);
        return this.profileService.buildProfileRes(profile);
    }

    @Post(':username/follow')
    @UseGuards(AuthGuard)
    async followProfile(@User('id') currentUserId:number, @Param('username') profileUserName:string):
    Promise<ProfileResponseInterface>
    {   
        const profile = await this.profileService.followProfile(currentUserId, profileUserName);
        return this.profileService.buildProfileRes(profile);
    }

    @Delete(':username/unfollow')
    @UseGuards(AuthGuard)
    async unfollowProfile(@User('id') currentUserId:number, @Param('username') profileUserName:string):
    Promise<ProfileResponseInterface>
    {   
        const profile = await this.profileService.unfollowProfile(currentUserId, profileUserName);
        return this.profileService.buildProfileRes(profile);
    }
}