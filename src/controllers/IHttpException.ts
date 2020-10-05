/**
 * Adjust native Error to include statuses per catch all error handling route
 * See https://stackoverflow.com/questions/11500204/how-can-i-get-express-js-to-404-only-on-missing-routes
 */
export interface IHttpException extends Error {
  status: number;
  message: string;
}