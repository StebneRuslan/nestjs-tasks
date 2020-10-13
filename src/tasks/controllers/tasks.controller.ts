import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskStatus } from '../models/task-status-enum';
import { CreateTaskDto } from '../models/dto/create-task.dto';
import { GetTasksFilterDto } from '../models/dto/get.tasks-filter.dto';
import { TaskStatusValidationPipe } from '../pipes/task-status-validation.pipe';
import { Task } from '../task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  //
  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   return  Object.keys(filterDto).length
  //     ? this.tasksService.getTasksWithFilters(filterDto)
  //     : this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
