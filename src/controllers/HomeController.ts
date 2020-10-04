import { IController } from "./IController";
import * as Express from 'express'; // needed for types
import { Factory } from "../Factory";

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
    let anagram = Factory.createAnagram(req.body.word1, req.body.word2);
    if(anagram.isAnagram()){
      res.app.locals.success = anagram.getStatusMsg();
      res.redirect(302, "/");
    } else {
      res.app.locals.error = anagram.getStatusMsg();
      res.redirect(302, "/");
    }
  }
}