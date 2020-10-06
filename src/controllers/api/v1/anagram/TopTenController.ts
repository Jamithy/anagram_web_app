import { Factory } from "../../../../Factory";
import { IController } from "../../../IController";
import * as Express from 'express'; // needed for types
import { IAnagramModel } from "../../../../models/IAnagram";

export class TopTenController implements IController {
  public async onGet(req: Express.Request, res: Express.Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async onPost(req: Express.Request, res: Express.Response): Promise<void> {
    let topTen: IAnagramModel[]
    try {
      // Get top ten most common pairs this session
      const sqlite = await Factory.createSqliteDb();
      topTen = await sqlite.read();
    } catch (error) {
      res.sendStatus(400);
      return res.end("Could not fetch anagram paid data.");
    }

    res.status(200);
    res.json(topTen);
  }
}