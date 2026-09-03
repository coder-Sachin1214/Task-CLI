import * as fs from "node:fs/promises";
import path from "node:path";
import { Task } from "../Objects/Task.js";
import { Status } from "../Enums/Status.js";

export class FileUtils {
    private static defaultPath: string = path.resolve(process.cwd(), "tasks.json");

    private static resolvePath(customPath?: string | null): string {
        return customPath ?? this.defaultPath;
    }

    private static async saveFile(tasks: Task[], customPath?: string | null): Promise<void> {
        const targetPath = this.resolvePath(customPath);
        await fs.writeFile(targetPath, JSON.stringify(tasks, null, 2), "utf-8");
    }

    static async loadFile(path?: string | null): Promise<Task[]> {
        let tasks: Task[] = [];

        try {
            const data = await fs.readFile(FileUtils.resolvePath(path), "utf-8");
            tasks = JSON.parse(data);
            if (!Array.isArray(tasks)) {
                tasks = [];
            }
        } catch (error: any) {
            if (error.code !== "ENOENT" && !(error instanceof SyntaxError)) {
                throw error;
            }
            console.log(error);
        }

        return tasks;
    }

    static async WriteIntoFile(task: string, status: Status, path?: string | null): Promise<void> {
        let tasks = await this.loadFile(path);
        let taskid = tasks.length;
        tasks.push(new Task(taskid, task, status));
        FileUtils.saveFile(tasks);
        console.log(`Task ${taskid} Added Successfully...`);
    }

    // Can do it seperately Also. Just Lazy to do it
    static async UpdateIntoFile(id: number, _task: string | null = null, _status: Status | null = null, path: string | null = null): Promise<void> {
        let tasks = await this.loadFile(path);
        if (id >= tasks.length) {
            throw new Error(`ElementNotFoundError: User with ID ${id} was not found.`);
        }
        tasks.forEach((task: Task) => {
            if (task.id === id) {
                task.task = _task ?? task.task;
                task.status = _status ?? task.status;
                task.updatedAt = new Date();
            }
        });
        FileUtils.saveFile(tasks);
        console.log(`Task ${id} Updated Successfully...`);
    }

    static async DeleteIntoFile(id: number, path: string | null = null) {
        let tasks = await this.loadFile(path);
        const index = tasks.findIndex((t) => t.id === id);

        if (index === -1) {
            throw new Error(`ElementNotFoundError: Task with ID ${id} was not found.`);
        }
        tasks.splice(index, 1);
        tasks.forEach((task, idx) => task.id = idx);
        FileUtils.saveFile(tasks);
        console.log("Task Deleted Successfully...");
    }
}
