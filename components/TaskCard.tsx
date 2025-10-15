"use client"

import { useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import type { Task, TaskStatus } from "@/lib/types"
import { MoreVertical, Trash2, ArrowRight, ArrowLeft, Edit, GripVertical } from "lucide-react"

interface TaskCardProps {
    task: Task
    onStatusChange: (id: string, status: TaskStatus) => void
    onEdit: (task: Task) => void
    onDelete: (id: string) => void
    isDraggable?: boolean
}

const statusConfig: Record<TaskStatus, { next?: TaskStatus; prev?: TaskStatus; label: string }> = {
    PENDING: { next: "IN_PROGRESS", label: "Pendiente" },
    "IN_PROGRESS": { next: "COMPLETED", prev: "PENDING", label: "En Curso" },
    COMPLETED: { prev: "IN_PROGRESS", label: "Completada" },
}

export function TaskCard({ task, onStatusChange, onEdit, onDelete, isDraggable = true }: TaskCardProps) {
    const [menuOpen, setMenuOpen] = useState(false)
    const config = statusConfig[task.status]

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useDraggable({
        id: task.id,
        disabled: !isDraggable,
    })

    const style = {
        transform: CSS.Translate.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow ${
                isDragging ? "opacity-50 rotate-3 shadow-lg" : ""
                }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    {isDraggable && (
                        <button
                            {...attributes}
                            {...listeners}
                            className="h-8 w-8 shrink-0 rounded-md hover:bg-accent transition-colors inline-flex items-center justify-center cursor-grab active:cursor-grabbing mt-0.5"
                        >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                    )}

                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-card-foreground text-balance leading-snug mb-1">{task.title}</h3>
                        {task.description && (
                            <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{task.description}</p>
                        )}
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="h-8 w-8 shrink-0 rounded-md hover:bg-accent transition-colors inline-flex items-center justify-center"
                    >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Opciones de tarea</span>
                    </button>

                    {menuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                            <div className="absolute right-0 top-10 z-20 w-56 rounded-md border border-border bg-popover shadow-lg">
                                <div className="p-1">
                                    <button
                                        onClick={() => {
                                            onEdit(task)
                                            setMenuOpen(false)
                                        }}
                                        className="w-full flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors text-left"
                                    >
                                        <Edit className="h-4 w-4" />
                                        Editar
                                    </button>
                                    {config.prev && (
                                        <button
                                            onClick={() => {
                                                onStatusChange(task.id, config.prev!)
                                                setMenuOpen(false)
                                            }}
                                            className="w-full flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors text-left"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                            Mover a {statusConfig[config.prev].label}
                                        </button>
                                    )}
                                    {config.next && (
                                        <button
                                            onClick={() => {
                                                onStatusChange(task.id, config.next!)
                                                setMenuOpen(false)
                                            }}
                                            className="w-full flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors text-left"
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                            Mover a {statusConfig[config.next].label}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            onDelete(task.id)
                                            setMenuOpen(false)
                                        }}
                                        className="w-full flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
