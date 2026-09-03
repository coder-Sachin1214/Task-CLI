import { Status } from "../Enums/Status.js";

export class Task {
  public id: number;
  public task: string;
  public status: Status;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id: number, task: string, status: Status) {
    this.id = id;
    this.task = task;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}