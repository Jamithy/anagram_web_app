import { IDb } from "./IDb";
import * as sqlite3 from 'sqlite3';
import { IAnagramModel } from "./IAnagram";

export class SqliteDb implements IDb<IAnagramModel> {
  constructor() {
    this._db = this.getDb();
  }

  private _db : Promise<sqlite3.Database>;

  private async getDb(): Promise<sqlite3.Database> {
    return new sqlite3.Database('./db/anagram.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
    });
  }
  
  public async init() {
    let sql = `CREATE TABLE IF NOT EXISTS 'anagram_pair' (
              'id'	    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
              'word1'	TEXT NOT NULL,
              'word2'	TEXT NOT NULL,
              'pairing' TEXT NOT NULL
              );
              PRAGMA user_version = 1;`;
    (await this._db).all(sql, [], async (err, rows) => {
      if (err) {
        (await this._db).close();
        throw err;
      }
      console.log('Creating table in in-memory SQlite database.');
    });
  }

  public async create(data: IAnagramModel) {
    // Sort the pairs so reverse pairings are considered the same
    let sorted = [data.word1, data.word2].sort();
    let sql = `INSERT INTO 'anagram_pair' (word1, word2, pairing)
               VALUES ('${sorted[0]}', '${sorted[1]}', '${sorted[0]}|${sorted[1]}');`;
    (await this._db).all(sql, [], async (err, rows) => {
      if (err) {
        (await this._db).close();
        throw err;
      }
    });
  }

  public async read(): Promise<IAnagramModel[]> {
    //let words = Factory.createAnagramModel();
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

  public async update() {
    throw new Error("Method not implemented.");
  }

  public async destroy() {
    throw new Error("Method not implemented.");
  }
}