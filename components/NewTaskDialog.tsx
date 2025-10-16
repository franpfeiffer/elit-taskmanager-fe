"use client"

import type React from "react"
import { useState } from "react"
import { Plus, X } from "lucide-react"
import type { Task, TaskStatus } from "@/lib/types"

interface NewTaskDialogProps {
    onCreateTask: (task: { title: string; description?: string; status: TaskStatus }) => Promise<Task>
}

export function NewTaskDialog({ onCreateTask }: NewTaskDialogProps) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim() || isSubmitting) return

        try {
            setIsSubmitting(true)
            await onCreateTask({
                title: title.trim(),
                description: description.trim() || undefined,
                status: "PENDING",
            })

            setTitle("")
            setDescription("")
            setOpen(false)
        } catch (error) {
            console.error('Error creating task:', error)
            alert('Error al crear la tarea')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full md:rounded-lg bg-primary p-3 md:px-6 md:py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Nueva Tarea"
            >
                <Plus className="h-5 w-5" />
                <span className="hidden md:inline">Nueva Tarea</span>
            </button>

            {open && (
                <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 min-h-screen">
                    <div className="fixed inset-0 z-[9998]" onClick={() => !isSubmitting && setOpen(false)} />
                    <div className="relative z-[10000] w-full max-w-lg bg-background rounded-lg shadow-lg border border-border">
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center justify-between p-6 border-b border-border">
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground">Crear Nueva Tarea</h2>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Agrega una nueva tarea a tu tablero. Comienza en estado Pendiente.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    disabled={isSubmitting}
                                    className="rounded-md p-2 hover:bg-accent transition-colors disabled:opacity-50"
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Cerrar</span>
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="text-sm font-medium text-foreground">
                                        Título <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        placeholder="Ej: Implementar autenticación"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="text-sm font-medium text-foreground">
                                        Descripción (opcional)
                                    </label>
                                    <textarea
                                        id="description"
                                        placeholder="Agrega detalles sobre la tarea..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        disabled={isSubmitting}
                                        rows={4}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-none disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={!title.trim() || isSubmitting}
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Creando...' : 'Crear Tarea'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
