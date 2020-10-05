import { IHttpException } from "./IHttpException";
import * as Express from 'express'; // needed for types

/**
 * Controller interface. Exception interface when the err optional parameter is
 * used first in an app.use() function which violates TS rules
 */
export interface IErrorController {
  /**
   * Save changes to the server
   */
  handle(err:IHttpException, req:Express.Request, res:Express.Response, next:Express.NextFunction):void;
}