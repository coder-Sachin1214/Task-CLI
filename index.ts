#!/usr/bin/env node

import { Status } from "./Enums/Status.js";
import { FileUtils } from "./Services/FileUtils.js";

const [, , command, ...rest] = process.argv;

function parseStatus(status: string) {
    if (typeof (status) !== 'string') throw Error("Status is not Provided. Please Enter the task!!");
    if (!Object.values(Status).includes(status as unknown as Status)) {
        throw Error(`${status} is NOT a valid Status.`);
    }
    return ((status === 'todo') ? Status.Todo : ((status === 'in-progress') ? Status.InProgress : Status.Done));
}

switch (command) {
    case 'add': {
        if (typeof (rest[0]) === 'undefined') throw Error("Task is not Provided. Please Enter the task!!");
        let task: string = rest[0];
        // @ts-ignore
        let status: Status = parseStatus(rest[1]);
        await FileUtils.WriteIntoFile(task, status);
        break;
    }
    case 'update': {
        if (typeof (rest[0]) === 'undefined') throw Error("Task ID is not Provided. Please Enter the task ID!!")
        if (typeof (rest[1]) === 'undefined') throw Error("task is not Provided. Please Enter the task!!")
        let taskid: number = parseInt(rest[0]);
        let task: string = rest[1];
        await FileUtils.UpdateIntoFile(taskid, task);
        break;
    }
    case 'mark-status': {
        if (typeof (rest[0]) === 'undefined') throw Error("Task ID is not Provided. Please Enter the task ID!!")
        let taskid: number = parseInt(rest[0]);
        //@ts-ignore
        let status: Status = parseStatus(rest[1]);
        await FileUtils.UpdateIntoFile(taskid,null,status);
        break;
    }
    case 'delete': {
        if (typeof (rest[0]) === 'undefined') throw Error("Task ID is not Provided. Please Enter the task ID!!")
        let taskid: number = parseInt(rest[0]);
        await FileUtils.DeleteIntoFile(taskid);
        break;
    }
    case 'list': {
        let tasks = await FileUtils.loadFile()
        if (!rest[0]) {
            console.log(tasks);
            break;
        }
        let status = parseStatus(rest[0]);
        console.log(tasks.filter(task => task.status === status));
        break;
    }
}