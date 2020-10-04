/** Interface for this servers persistent (or in memory) database  */
export interface IDb {
  /** Create db from scratch */
  init(): boolean;

  /** Add new record to a current db */
  create(): void;

  /** Retrieve currently existing records from db */
  read<T>(): T;

  /** Mutate data within a currently existing record existing with db */
  update(): void;

  /** Delete records from current db */
  destroy(): void;
}