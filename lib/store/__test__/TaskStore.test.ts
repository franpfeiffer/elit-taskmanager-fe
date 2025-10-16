import { describe, it, expect, beforeEach } from "bun:test";
import { useTaskStore } from "../TaskStore";

describe("TaskStore", () => {
    beforeEach(() => {
        useTaskStore.setState({ tasks: [], isLoading: false, error: null });
    });

    it("initializes with empty tasks", () => {
        const state = useTaskStore.getState();
        expect(state.tasks).toEqual([]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(null);
    });

    it("filters tasks by status", () => {
        const mockTasks = [
            {
                id: "1",
                title: "Task 1",
                description: "Desc 1",
                status: "PENDING" as const,
                createdAt: "2024-01-01",
                updatedAt: "2024-01-01",
            },
            {
                id: "2",
                title: "Task 2",
                description: "Desc 2",
                status: "COMPLETED" as const,
                createdAt: "2024-01-01",
                updatedAt: "2024-01-01",
            },
        ];

        useTaskStore.setState({ tasks: mockTasks });

        const store = useTaskStore.getState();
        const pendingTasks = store.getTasksByStatus("PENDING");

        expect(pendingTasks).toHaveLength(1);
        expect(pendingTasks[0].status).toBe("PENDING");
    });

    it("adds multiple tasks to state", () => {
        const task1 = {
            id: "1",
            title: "Task 1",
            description: "Desc 1",
            status: "PENDING" as const,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        };

        const task2 = {
            id: "2",
            title: "Task 2",
            description: "Desc 2",
            status: "IN_PROGRESS" as const,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        };

        useTaskStore.setState({ tasks: [task1, task2] });

        const state = useTaskStore.getState();
        expect(state.tasks).toHaveLength(2);
    });
});
