export interface IController {
  /**
   * Handler for GET requests, usually for a client GET req from a 
   * corresponding view that matches this controller
   */
  onGet(req:Express.Request, res:Express.Response, next?:Express.Application):void;

  /**
   * Handler for POST requests, usually for a client form submission from a 
   * corresponding view that matches this controller or an API request
   */
  onPost(req:Express.Request, res:Express.Response, next?:Express.Application):void;
}