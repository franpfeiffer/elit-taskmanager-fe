"use client"

import { useTasks } from "@/hooks/use-tasks"
import { TaskColumn } from "@/components/task-column"
import { NewTaskDialog } from "@/components/new-task-dialog"
import type { TaskStatus } from "@/lib/types"
import { Loader2 } from "lucide-react"

const columns: Array<{ id: TaskStatus; title: string }> = [
    { id: "PENDING", title: "Pendiente" },
    { id: "IN_PROGRESS", title: "En Curso" },
    { id: "COMPLETED", title: "Completada" },
]

export default function Home() {
    const { isLoading, error, addTask, updateTaskStatus, deleteTask, getTasksByStatus } = useTasks()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-destructive text-lg">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    Reintentar
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground text-balance">Gestor de Tareas</h1>
                            <p className="text-muted-foreground mt-1">Organiza y gestiona tus tareas de manera eficiente</p>
                        </div>
                        <NewTaskDialog onCreateTask={addTask} />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                    {columns.map((column) => (
                        <TaskColumn
                            key={column.id}
                            title={column.title}
                            status={column.id}
                            tasks={getTasksByStatus(column.id)}
                            onStatusChange={updateTaskStatus}
                            onDelete={deleteTask}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}
