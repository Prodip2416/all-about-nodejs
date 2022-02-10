import { JSON_WEB_TOKEN } from './../config';
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ExpressRequest } from "src/user/types/expressRequest.interface";
import {verify} from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleWare implements NestMiddleware{
    constructor(private readonly userService: UserService){}
    async use(req:ExpressRequest, _:Response, next:NextFunction){
        if(!req.headers.authorization){
            req.user = null;
            next();
            return;
        }   

        const token = req.headers.authorization.split(' ')[1];

        try{
          
            const decode = verify(token, JSON_WEB_TOKEN);
            const user = await this.userService.findById(decode.id);
            req.user = user;
            next();
        }catch(err){
            req.user = null;
            next();
        }   
    }
}