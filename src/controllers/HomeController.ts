import { IController } from "./IController";
import * as Express from 'express'; // needed for types
import { Factory } from "../Factory";

/** The home page of the website, in this case, an anagram checker app */
export class HomeController implements IController {
  /**
   * Get's the main page, in this case, the single-page anagram checker app
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

  /**
   * Inputs a post request with word1 and word2 to evaluate whether an
   * anagram pair exists
   * @param  req Express Request
   * @param  res Express Response
   */
  public onPost(req:Express.Request, res:Express.Response): void {
    let words = Factory.createAnagramModel();
    words.word1 = req.body.word1;
    words.word2 = req.body.word2;
    let anagram = Factory.createAnagram(words);
    if(anagram.isAnagram()){
      res.app.locals.success = anagram.getStatusMsg();
      // Add pair to db
      res.redirect(302, "/");
    } else {
      res.app.locals.error = anagram.getStatusMsg();
      res.redirect(302, "/");
    }
  }
}