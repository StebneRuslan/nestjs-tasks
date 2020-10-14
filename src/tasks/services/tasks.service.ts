import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '../models/task-status-enum';
import { CreateTaskDto } from '../models/dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../task.repository';
import { Task } from '../task.entity';
import { GetTasksFilterDto } from '../models/dto/get.tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}
  
  public getTask(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  public async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }
    return found;
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  public async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} not found!`);
    }
  }

  public async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    task.status = status;
    await task.save();
    return task;
  }
}
