import { IController } from "./IController";
import * as Express from 'express'; // needed for types

/**
 * CatchAll Handler used near the end of all http routes,
 * used primarily to catch whether a 404 error has occured
 */
export class CatchAllController implements IController {
  /**
   * Throw a 404 error if an http get ever gets to this route
   * @param  req Express Request
   * @param  res Express Response
   * @param  next If this isn't the final destination, go to next route
   */
  onGet(_req:Express.Request, _res:Express.Response, next:Express.NextFunction): void {
    next({
      status: 404,
      message: 'Not Found',
    });
  }

  /**
   * For the sake of this demo, post requests to this route 
   * should 500 out and bubble up to the exception handler
   * @param  req Express Request
   * @param  res Express Response
   * @param  next If this isn't the final destination, go to next route
   */
  onPost(req: Express.Request, res: Express.Response, next?: Express.Application): void {
    throw new Error("Method not implemented.");
  }
}