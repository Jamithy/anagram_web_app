import { HttpException } from "../models/IHttpException";
import { IErrorController } from "./IErrorController";
import * as Express from 'express'; // needed for types

/**
 * Error Handler
 */
export class ExpressErrorController implements IErrorController {
  /**
   * Handler
   * @param  req Express Request
   * @param  res Express Response
   */
  handle(error:HttpException, _req:Express.Request, res:Express.Response, _next:Express.NextFunction) {
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