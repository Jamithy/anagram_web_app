/** Interface for this servers persistent (or in memory) database  */
export interface IDb<T> {
  /** Create db from scratch */
  init(): void;

  /** Add new record to a current db */
  create(data: T): void;

  /** Retrieve currently existing records from db */
  read(): void;

  /** Mutate data within a currently existing record existing with db */
  update(data: T): void;

  /** Delete records from current db */
  destroy(): void;
}