import { taskApi } from './api';
import type { Task } from './types';

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export const taskService = {
    async getTasks(): Promise<Task[]> {
        return await taskApi.getAll();
    },

    async addTask(task: { title: string; description?: string; status?: TaskStatus }): Promise<Task> {
        return await taskApi.create({
            title: task.title,
            description: task.description,
            status: task.status || 'PENDING',
        });
    },

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        return await taskApi.update(id, { status });
    },

    async deleteTask(id: string): Promise<void> {
        await taskApi.delete(id);
    },
};
