import { IHttpException } from "./IHttpException";
import { IErrorController } from "./IErrorController";
import * as Express from 'express'; // needed for types

/**
 * Error Handler
 */
export class ExpressErrorController implements IErrorController {
  /**
   * Exception handler for 500 errors used to provide a clean client interface
   * when a server-side error has occured.
   * @param error Error particulars including an http error number and status description
   * @param  req Express Request
   * @param  res Express Response
   * @param  next If this isn't the final destination, go to next route
   */
  handle(error:IHttpException, _req:Express.Request, res:Express.Response, _next:Express.NextFunction) {
    if (error.status == undefined) {
      error.status = 500;
      error.message = "An internal service error has occured";
    }
    res.status(error.status).render('error', {
      error: error.message,
      errorCode: error.status
    });
  }
}