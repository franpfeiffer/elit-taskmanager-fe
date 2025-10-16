"use client"

import { useState, useEffect } from "react"
import { DndContext, closestCenter, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { useTaskStore } from "@/lib/store/TaskStore"
import { TaskColumn } from "@/components/TaskColumn"
import { NewTaskDialog } from "@/components/NewTaskDialog"
import { TaskEditModal } from "@/components/TaskEditModal"
import { TaskCard } from "@/components/TaskCard"
import { ThemeToggle } from "@/components/ThemeToggle"
import type { Task, TaskStatus } from "@/lib/types"
import { Loader2 } from "lucide-react"

const columns: Array<{ id: TaskStatus; title: string }> = [
    { id: "PENDING", title: "Pendiente" },
    { id: "IN_PROGRESS", title: "En Curso" },
    { id: "COMPLETED", title: "Completada" },
]

export default function Home() {
    const {
        isLoading,
        error,
        loadTasks,
        addTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        getTasksByStatus
    } = useTaskStore()

    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    useEffect(() => {
        loadTasks()
    }, [loadTasks])

    const handleEdit = (task: Task) => {
        setEditingTask(task)
    }

    const handleSaveEdit = async (id: string, updates: { title: string; description?: string; status: TaskStatus }) => {
        await updateTask(id, updates)
    }

    const handleCloseEdit = () => {
        setEditingTask(null)
    }

    const handleDragStart = (event: DragStartEvent) => {
        const taskId = event.active.id as string
        const allTasks = [...getTasksByStatus("PENDING"), ...getTasksByStatus("IN_PROGRESS"), ...getTasksByStatus("COMPLETED")]
        const task = allTasks.find(t => t.id === taskId)
        setActiveTask(task || null)
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event
        setActiveTask(null)

        if (!over) return

        const taskId = active.id as string
        const newStatus = over.id as TaskStatus

        if (columns.some(col => col.id === newStatus)) {
            try {
                await updateTaskStatus(taskId, newStatus)
            } catch (error) {
                console.error('Error updating task status:', error)
            }
        }
    }

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
                    onClick={() => loadTasks()}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    Reintentar
                </button>
            </div>
        )
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="min-h-screen bg-background">
                <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="container mx-auto px-4 py-4 md:py-6">
                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">Gestor de Tareas</h1>
                                <p className="text-sm md:text-base text-muted-foreground mt-1 hidden sm:block">Organiza y gestiona tus tareas de manera eficiente</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <ThemeToggle />
                                <NewTaskDialog onCreateTask={addTask} />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-6 md:py-8 pb-20 md:pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[calc(100vh-250px)] md:h-[calc(100vh-200px)]">
                        {columns.map((column) => (
                            <TaskColumn
                                key={column.id}
                                title={column.title}
                                status={column.id}
                                tasks={getTasksByStatus(column.id)}
                                onStatusChange={updateTaskStatus}
                                onEdit={handleEdit}
                                onDelete={deleteTask}
                            />
                        ))}
                    </div>
                </main>

                <DragOverlay>
                    {activeTask ? (
                        <div className="rotate-3 opacity-90">
                            <TaskCard
                                task={activeTask}
                                onStatusChange={() => {}}
                                onEdit={() => {}}
                                onDelete={() => {}}
                            />
                        </div>
                    ) : null}
                </DragOverlay>

                <TaskEditModal
                    task={editingTask}
                    isOpen={!!editingTask}
                    onClose={handleCloseEdit}
                    onSave={handleSaveEdit}
                />
            </div>
        </DndContext>
    )
}
