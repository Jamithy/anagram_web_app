import { RouterController } from "./controllers/RouterController";
import { CatchAllController } from "./controllers/CatchAllController";
import { ExpressErrorController } from "./controllers/ExpressErrorController";
import { HomeController } from "./controllers/HomeController";
import { IController } from "./controllers/IController";
import { IErrorController } from "./controllers/IErrorController";
import { Anagram } from "./models/Anagram";
import { IAnagram } from "./models/IAnagram";

export class Factory {
  //#region Base

  public static createRouterController(app): RouterController {
    return new RouterController(app);
  }

  //#endregion Base

  //#region Models

  public static createAnagram(w1: string, w2: string): IAnagram {
    return new Anagram(w1, w2);
  }

  //#endregion Models

  //#region Controllers

  public static createHomeController(): new () => IController {
    return HomeController;
  }

  public static createCatchAllController() : IController {
    return new CatchAllController();
  }

  public static createExpressErrorController() : IErrorController {
    return new ExpressErrorController();
  }

  //#endregion Controllers
}