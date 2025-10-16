import { describe, it, expect } from "bun:test";
import type { Task, TaskStatus } from "../types";

describe("Types", () => {
    it("validates TaskStatus values", () => {
        const validStatuses: TaskStatus[] = ["PENDING", "IN_PROGRESS", "COMPLETED"];

        validStatuses.forEach(status => {
            expect(["PENDING", "IN_PROGRESS", "COMPLETED"]).toContain(status);
        });
    });

    it("creates a valid Task object", () => {
        const task: Task = {
            id: "1",
            title: "Test Task",
            description: "Test Description",
            status: "PENDING",
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        };

        expect(task.id).toBe("1");
        expect(task.title).toBe("Test Task");
        expect(task.status).toBe("PENDING");
    });
});
