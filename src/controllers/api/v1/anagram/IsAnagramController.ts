import { IController } from "../../../IController";
import * as Express from 'express'; // needed for types
import { Factory } from "../../../../Factory";

export class IsAnagramController implements IController {
  public async onGet(req: Express.Request, res: Express.Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async onPost(req: Express.Request, res: Express.Response): Promise<void> {
    let words = Factory.createAnagramModel();
    words.word1 = req.body.word1;
    words.word2 = req.body.word2;

    let anagram = Factory.createAnagram(words);
    if (anagram.isAnagram()) {
      // Add pair to db
      const sqlite = await Factory.createSqliteDb();
      sqlite.create(words);
    }
    res.status(200);
    res.send(anagram.getStatusMsg());
  }
}