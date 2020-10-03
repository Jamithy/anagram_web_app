import { IController } from "./IController";
import * as Express from 'express'; // needed for types

/**
 * CatchAll Handler
 */
export class CatchAllController implements IController {
  /**
   * Handler
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

  onPost(req: Express.Request, res: Express.Response, next?: Express.Application): void {
    throw new Error("Method not implemented.");
  }
}