import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get('list')
    getMessages() {
        return ['Hello World', 'NestJS is awesome!'];
    }

    @Post('create')
    createMessage() {
        return { message: 'Message created successfully!' };
    }

    @Get(':id')
    getMessageById() {
        return { id: 1, message: 'This is a specific message.' };
    }
}
