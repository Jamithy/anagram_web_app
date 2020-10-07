import { IDb } from "./IDb";
import * as sqlite3 from 'sqlite3';
import { IAnagramModel } from "./IAnagram";

/** A Sqlite specific implementation of a database
 * Used specifically for interacting with the IAnagram
 * interface.
 */
export class SqliteDb implements IDb<IAnagramModel> {
  constructor() {
    this._db = this.getDb();
  }

  private _db: Promise<sqlite3.Database>;
  private readonly _dbPath = "./db/anagram.db"

  private async getDb(): Promise<sqlite3.Database> {
    return new sqlite3.Database(this._dbPath, (err) => {
      if (err) {
        return console.error(err.message);
      }
    });
  }

  private async postSql(query: string): Promise<void> {
    (await this._db).all(query, [], async (err, rows) => {
      if (err) {
        (await this._db).close();
        throw err;
      }
    });
  }

  public async init() {
    let query = `CREATE TABLE IF NOT EXISTS 'anagram_pair' (
      'id'	    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
      'word1'	  TEXT NOT NULL,
      'word2'	  TEXT NOT NULL,
      'pairing' TEXT NOT NULL
      );
      PRAGMA user_version = 1;`;
    await this.postSql(query);
    console.log('Creating table in in-memory SQlite database.');
  }

  public async create(data: IAnagramModel) {
    // Sort the pairs so reverse pairings are considered the same
    let sorted = [data.word1.toLowerCase(), data.word2.toLowerCase()].sort();
    let query = `INSERT INTO 'anagram_pair' (word1, word2, pairing)
      VALUES ('${sorted[0]}', '${sorted[1]}', '${sorted[0]}|${sorted[1]}');`;
    await this.postSql(query);
  }

  public async read(): Promise<IAnagramModel[]> {
    let sql = `SELECT word1, word2,
      COUNT(pairing) AS count
      FROM 'anagram_pair'
      GROUP BY pairing
      ORDER BY count DESC
      LIMIT 10;`;
    return new Promise(async (resolve, reject) => {
      (await this._db).all(sql, [], async (err, rows: Promise<IAnagramModel[]>) => {
        if (err) {
          (await this._db).close();
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  // For demo purposes, because each record is unique and no mutations occur,
  // this feature remains undeveloped
  public async update() {
    throw new Error("Method not implemented.");
  }

  // For demo purposes, because the database is not persistent between
  // sessions, this feature remains undeveloped
  public async destroy() {
    throw new Error("Method not implemented.");
  }
}