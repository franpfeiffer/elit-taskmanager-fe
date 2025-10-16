"use client"

import { useState, useEffect, useCallback } from "react"
import type { Task, TaskStatus } from "@/lib/types"
import { TaskService } from "@/lib/TaskService"

export function UseTasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const loadTasks = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const loadedTasks = await TaskService.getTasks()
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
            const newTask = await TaskService.addTask(taskData)
            setTasks((prev) => [...prev, newTask])
            return newTask
        } catch (err) {
            console.error('Error adding task:', err)
            throw err
        }
    }, [])

    const updateTask = useCallback(async (id: string, updates: { title?: string; description?: string; status?: TaskStatus }) => {
        try {
            const updatedTask = await TaskService.updateTask(id, updates)
            setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)))
            return updatedTask
        } catch (err) {
            console.error('Error updating task:', err)
            throw err
        }
    }, [])

    const updateTaskStatus = useCallback(async (id: string, status: TaskStatus) => {
        const previousTasks = tasks
        const taskToUpdate = tasks.find(t => t.id === id)

        if (!taskToUpdate) {
            console.error('Task not found:', id)
            return
        }

        const optimisticTask = { ...taskToUpdate, status }
        setTasks((prev) => prev.map((task) => (task.id === id ? optimisticTask : task)))

        try {
            const updatedTask = await TaskService.updateTaskStatus(id, status)
            setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)))
            return updatedTask
        } catch (err) {
            console.error('Error updating task status, reverting:', err)
            setTasks(previousTasks)
            throw err
        }
    }, [tasks])

    const deleteTask = useCallback(async (id: string) => {
        const previousTasks = tasks

        setTasks((prev) => prev.filter((task) => task.id !== id))

        try {
            await TaskService.deleteTask(id)
            return true
        } catch (err) {
            console.error('Error deleting task, reverting:', err)
            setTasks(previousTasks)
            throw err
        }
    }, [tasks])

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
        updateTask,
        updateTaskStatus,
        deleteTask,
        getTasksByStatus,
        refresh: loadTasks,
    }
}
