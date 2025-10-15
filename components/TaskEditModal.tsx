"use client"

import { useState, useEffect } from "react"
import type { Task, TaskStatus } from "@/lib/types"
import { X } from "lucide-react"

interface TaskEditModalProps {
    task: Task | null
    isOpen: boolean
    onClose: () => void
    onSave: (id: string, updates: { title: string; description?: string; status: TaskStatus }) => Promise<void>
}

const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: "PENDING", label: "Pendiente" },
    { value: "IN_PROGRESS", label: "En Curso" },
    { value: "COMPLETED", label: "Completada" },
]

export function TaskEditModal({ task, isOpen, onClose, onSave }: TaskEditModalProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState<TaskStatus>("PENDING")
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (task) {
            setTitle(task.title)
            setDescription(task.description || "")
            setStatus(task.status)
        }
    }, [task])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!task || !title.trim()) return

        setIsSaving(true)
        try {
            await onSave(task.id, {
                title: title.trim(),
                description: description.trim() || undefined,
                status,
            })
            onClose()
        } catch (error) {
            console.error("Error saving task:", error)
        } finally {
            setIsSaving(false)
        }
    }

    if (!isOpen || !task) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-card-foreground">Editar Tarea</h2>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 rounded-md hover:bg-accent transition-colors inline-flex items-center justify-center"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
                            Título
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-foreground mb-1">
                            Estado
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TaskStatus)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-input rounded-md text-foreground hover:bg-accent transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!title.trim() || isSaving}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
