import { create } from 'zustand'
import type { Task, TaskStatus } from '@/lib/types'
import { TaskService } from '@/lib/TaskService'

interface TaskState {
    tasks: Task[]
    isLoading: boolean
    error: string | null

    loadTasks: () => Promise<void>
    addTask: (taskData: { title: string; description?: string; status?: TaskStatus }) => Promise<Task>
    updateTask: (id: string, updates: { title?: string; description?: string; status?: TaskStatus }) => Promise<Task>
    updateTaskStatus: (id: string, status: TaskStatus) => Promise<Task>
    deleteTask: (id: string) => Promise<boolean>
    getTasksByStatus: (status: TaskStatus) => Task[]
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,

    loadTasks: async () => {
        set({ isLoading: true, error: null })
        try {
            const tasks = await TaskService.getTasks()
            set({ tasks, isLoading: false })
        } catch (error) {
            set({ error: 'Error al cargar las tareas', isLoading: false })
            console.error('Error loading tasks:', error)
        }
    },

    addTask: async (taskData) => {
        try {
            const newTask = await TaskService.addTask(taskData)
            set(state => ({ tasks: [...state.tasks, newTask] }))
            return newTask
        } catch (error) {
            console.error('Error adding task:', error)
            throw error
        }
    },

    updateTask: async (id, updates) => {
        try {
            const updatedTask = await TaskService.updateTask(id, updates)
            set(state => ({
                tasks: state.tasks.map(task => task.id === id ? updatedTask : task)
            }))
            return updatedTask
        } catch (error) {
            console.error('Error updating task:', error)
            throw error
        }
    },

    updateTaskStatus: async (id, status) => {
        const { tasks } = get()
        const taskToUpdate = tasks.find(t => t.id === id)

        if (!taskToUpdate) {
            console.error('Task not found:', id)
            throw new Error('Task not found')
        }

        const optimisticTask = { ...taskToUpdate, status }
        set(state => ({
            tasks: state.tasks.map(task => task.id === id ? optimisticTask : task)
        }))

        try {
            const updatedTask = await TaskService.updateTaskStatus(id, status)
            set(state => ({
                tasks: state.tasks.map(task => task.id === id ? updatedTask : task)
            }))
            return updatedTask
        } catch (error) {
            set({ tasks })
            console.error('Error updating task status:', error)
            throw error
        }
    },

    deleteTask: async (id) => {
        const { tasks } = get()

        set(state => ({
            tasks: state.tasks.filter(task => task.id !== id)
        }))

        try {
            await TaskService.deleteTask(id)
            return true
        } catch (error) {
            set({ tasks })
            console.error('Error deleting task:', error)
            throw error
        }
    },

    getTasksByStatus: (status) => {
        return get().tasks.filter(task => task.status === status)
    }
}))
