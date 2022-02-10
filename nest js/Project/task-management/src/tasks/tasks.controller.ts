import { TaskStatusValidatePipe } from './pipes/task-status-validate.pipe';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/getTaskFilter.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    async getTasks(@Query(ValidationPipe) taskFilterDto: GetTaskFilterDto): Promise<Task[]> {
        return await this.tasksService.getTasks(taskFilterDto);
    }

    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return await this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    async updateTask(@Body('status', TaskStatusValidatePipe) status: TaskStatus, @Param('id', ParseIntPipe) id: number): Promise<Task> {
        return await this.tasksService.updateTask(id, status);
    }

    @Delete('/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.tasksService.deleteTask(id);
    }
}
