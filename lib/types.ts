export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED"

export interface Task {
    id: string
    title: string
    description?: string
    status: TaskStatus
    createdAt: string
    updatedAt: string
}

export interface TaskColumn {
    id: TaskStatus
    title: string
    tasks: Task[]
}
