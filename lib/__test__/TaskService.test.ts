import { describe, it, expect } from "bun:test";

describe("TaskService", () => {
    it("has required methods", async () => {
        const { TaskService } = await import("../TaskService");

        expect(typeof TaskService.getTasks).toBe("function");
        expect(typeof TaskService.addTask).toBe("function");
        expect(typeof TaskService.updateTask).toBe("function");
        expect(typeof TaskService.updateTaskStatus).toBe("function");
        expect(typeof TaskService.deleteTask).toBe("function");
    });

    it("exports TaskStatus type", async () => {
        const module = await import("../TaskService");
        expect(module).toBeDefined();
    });
});
