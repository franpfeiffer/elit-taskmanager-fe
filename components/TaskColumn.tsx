"use client"

import type { Task, TaskStatus } from "@/lib/types"
import { TaskCard } from "./TaskCard"

interface TaskColumnProps {
    title: string
    status: TaskStatus
    tasks: Task[]
    onStatusChange: (id: string, status: TaskStatus) => void
    onEdit: (task: Task) => void
    onDelete: (id: string) => void
}

const statusColors: Record<TaskStatus, string> = {
    PENDING: "bg-muted",
    "IN_PROGRESS": "bg-accent/10",
    COMPLETED: "bg-primary/10",
}

export function TaskColumn({ title, status, tasks, onStatusChange, onEdit, onDelete }: TaskColumnProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                    <span className="text-sm font-medium text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
                        {tasks.length}
                    </span>
                </div>
                <div className={`h-1 rounded-full ${statusColors[status]}`} />
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto">
                {tasks.length === 0 ? (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                        <p className="text-sm text-muted-foreground">No hay tareas</p>
                    </div>
                ) : (
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onStatusChange={onStatusChange}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    )}
            </div>
        </div>
    )
}
