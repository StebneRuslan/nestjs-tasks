import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '../models/task-status-enum';
import { CreateTaskDto } from '../models/dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../task.repository';
import { Task } from '../task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}
  // private tasks: Task[] = [];
  //
  // public getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
  //   }
  //   return tasks;
  // }

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
