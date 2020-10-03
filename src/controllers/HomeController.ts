import { IController } from "./IController";
import * as Express from 'express'; // needed for types

export class HomeController implements IController {
  /**
   * Handler for GET request usually from client
   * Render the webpage corresponding to this controller
   * @param  req Express Request
   * @param  res Express Response
   */
  public onGet(_req:Express.Request, res:Express.Response): void {
    res.render("home", {
      title: "Home",
      error: res.app.locals.error,
      success: res.app.locals.success
    });
    res.app.locals.error = undefined;
    res.app.locals.success = undefined;
  }

  public onPost(req:Express.Request, res:Express.Response): void {
    throw new Error("Method not implemented.");
  }
}