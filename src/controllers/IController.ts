/**
 * General router interface used to process http requests
 * - for the demo, only GET and POST requests are considered
 */
export interface IController {
  /**
   * Handler for GET requests, usually for a client GET req from a 
   * corresponding view that matches this controller
   * @param  req Express Request
   * @param  res Express Response
   * @param  next If this isn't the final destination, go to next route
   */
  onGet(req:Express.Request, res:Express.Response, next?:Express.Application):void;

  /**
   * Handler for POST requests, usually for a client form submission from a 
   * corresponding view that matches this controller or an API request
   * @param  req Express Request
   * @param  res Express Response
   * @param  next If this isn't the final destination, go to next route
   */
  onPost(req:Express.Request, res:Express.Response, next?:Express.Application):void;
}