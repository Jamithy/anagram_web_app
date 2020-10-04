import { IController } from "./IController";
import * as Express from 'express'
import { Factory } from "../Factory";

/** A Controller to determine what classes should handle which http requests */
export class RouterController {
  constructor(app) {
    this.getRoutes(app);
  }
  
  /**
   * All http requests to be routed should be added to this list
   * @param app Express class used to handle http requests
   */
  private getRoutes(app) {
    // Routes
    app.get('/', this.route(Factory.createHomeController(), Router.httpReq.get));
    app.post('/', this.route(Factory.createHomeController(), Router.httpReq.post));

    // Handles 404 and 500 errors
    // NOTE: These two error-based routes should be processed last since order matters
    app.use((Factory.createCatchAllController()).onGet);
    app.use((Factory.createExpressErrorController()).handle);
  }

  /**
   * create new class based on name and run this.onGet/onPost, recognizing that errors
   * should always be sent to the error page.
   * @param controller The class that corresponds to this particular GET or POST request
   */
  private route(controller: new () => IController, reqType: Router.httpReq) {
    return function(req:Express.Request, res:Express.Response, next:Express.NextFunction) {
      try {
        if (reqType == Router.httpReq.get) {
          (new controller).onGet(req, res, next);
        } else if (reqType == Router.httpReq.post) {
          (new controller).onPost(req, res, next);
        } else {
          throw new Error("For the sake of this demo, HTTP requests other than GET and POST have not been implemented.");
        }
      } catch (e) {
        next(e);
      }
    }
  }
}

export namespace Router {
  export enum httpReq {
    get,
    head,
    post,
    put,
    delete,
    connect,
    options,
    trace,
    patch
  }
}