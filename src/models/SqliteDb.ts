import { IDb } from "./IDb";

export class SqliteDb implements IDb {
  init(): boolean {
    throw new Error("Method not implemented.");
  }

  create(): void {
    throw new Error("Method not implemented.");
  }

  read<T>(): T {
    throw new Error("Method not implemented.");
  }

  update(): void {
    throw new Error("Method not implemented.");
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }
}