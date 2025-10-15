const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskDTO {
    title: string;
    description?: string;
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export const taskApi = {
    async getAll(): Promise<Task[]> {
        const response = await fetch(`${API_URL}/api/tasks`, {
            cache: 'no-store',
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },

    async getById(id: string): Promise<Task> {
        const response = await fetch(`${API_URL}/api/tasks/${id}`, {
            cache: 'no-store',
        });
        if (!response.ok) throw new Error('Failed to fetch task');
        return response.json();
    },

    async create(data: CreateTaskDTO): Promise<Task> {
        const response = await fetch(`${API_URL}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create task');
        return response.json();
    },

    async update(id: string, data: UpdateTaskDTO): Promise<Task> {
        const response = await fetch(`${API_URL}/api/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
    },

    async delete(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/api/tasks/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete task');
    },
};
