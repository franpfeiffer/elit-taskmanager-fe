"use client"

import { useState, useEffect, useCallback } from "react"
import type { Task, TaskStatus } from "@/lib/types"
import { taskService } from "@/lib/task-service"

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const loadTasks = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const loadedTasks = await taskService.getTasks()
            setTasks(loadedTasks)
        } catch (err) {
            setError('Error al cargar las tareas')
            console.error('Error loading tasks:', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadTasks()
    }, [loadTasks])

    const addTask = useCallback(async (taskData: { title: string; description?: string; status?: TaskStatus }) => {
        try {
            const newTask = await taskService.addTask(taskData)
            setTasks((prev) => [...prev, newTask])
            return newTask
        } catch (err) {
            console.error('Error adding task:', err)
            throw err
        }
    }, [])

    const updateTaskStatus = useCallback(async (id: string, status: TaskStatus) => {
        try {
            const updatedTask = await taskService.updateTaskStatus(id, status)
            setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)))
            return updatedTask
        } catch (err) {
            console.error('Error updating task:', err)
            throw err
        }
    }, [])

    const deleteTask = useCallback(async (id: string) => {
        try {
            await taskService.deleteTask(id)
            setTasks((prev) => prev.filter((task) => task.id !== id))
            return true
        } catch (err) {
            console.error('Error deleting task:', err)
            throw err
        }
    }, [])

    const getTasksByStatus = useCallback(
        (status: TaskStatus) => {
            return tasks.filter((task) => task.status === status)
        },
        [tasks],
    )

    return {
        tasks,
        isLoading,
        error,
        addTask,
        updateTaskStatus,
        deleteTask,
        getTasksByStatus,
        refresh: loadTasks,
    }
}
