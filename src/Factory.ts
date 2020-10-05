import { RouterController } from "./controllers/RouterController";
import { CatchAllController } from "./controllers/CatchAllController";
import { ExpressErrorController } from "./controllers/ExpressErrorController";
import { HomeController } from "./controllers/HomeController";
import { IController } from "./controllers/IController";
import { IErrorController } from "./controllers/IErrorController";
import { Anagram } from "./models/Anagram";
import { IAnagram, IAnagramModel } from "./models/IAnagram";
import { SqliteDb } from "./models/SqliteDb";
import { IDb } from "./models/IDb";
import { TopTenController } from "./controllers/api/v1/anagram/TopTenController";
import { IsAnagramController } from "./controllers/api/v1/anagram/IsAnagramController";

/** Rather than implement and 'new-up' concrete implementation,
 * uses a factory that stores reference to namespaces other than interfaces */
export class Factory {
  //#region Base

  public static createRouterController(app): RouterController {
    return new RouterController(app);
  }

  //#endregion Base

  //#region Models

  public static createAnagram(w: Anagram.Model): IAnagram {
    return new Anagram(w);
  }

  /** Helper function for several unit tests to reduce verbosity by creating models on the fly */
  public static createAnagramUnit(w1: string, w2: string): IAnagram {
    let m = new Anagram.Model;
    m.word1 = w1;
    m.word2 = w2;
    return new Anagram(m);
  }

  public static createAnagramModel(): Anagram.Model {
    return new Anagram.Model();
  }

  public static async createSqliteDb(): Promise<IDb<IAnagramModel>> {
    return new SqliteDb();
  }

  //#endregion Models

  //#region Controllers

  // Web Pages
  public static createHomeController(): new () => IController {
    return HomeController;
  }

  // API
  static createTopTenController(): new () => IController {
    return TopTenController;
  }

  static createIsAnagramController(): new () => IController {
    return IsAnagramController;
  }

  // Errors
  public static createCatchAllController() : IController {
    return new CatchAllController();
  }

  public static createExpressErrorController() : IErrorController {
    return new ExpressErrorController();
  }

  //#endregion Controllers
}