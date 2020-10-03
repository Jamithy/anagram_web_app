import * as Express from 'express'
import * as session from 'express-session';
import { CatchAllController } from './controllers/CatchAllController';
import { ExpressErrorController } from './controllers/ExpressErrorController';
import { HomeController } from './controllers/HomeController';
import { IController } from './controllers/IController';

require("dotenv").config({ path: "../.env" });

const app = Express();

// Express config
app.set('view engine', 'pug');
app.use(Express.urlencoded({
  limit: "10mb",
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(Express.json({limit:"10mb"}));

//stop attackers from knowing we use expressjs (header)
app.disable('x-powered-by');

app.use('/assets', Express.static('assets'));

// Session
app.use(session({
  name: "userSession",
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Server
const server: any = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${server.address().port}`);
});

// TODO: #3_move_router_into_file Move this into it's own dedicated router class
enum httpReq {
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

/**
 * create new class based on name and run this.handle, recognizing that errors
 * should always be sent to the error page.
 * @param controller The class that corresponds to this particular GET or POST request
 */
function route(controller: new () => IController, reqType: httpReq) {
  return function(req:Express.Request, res:Express.Response, next:Express.NextFunction) {
    try {
      if (reqType == httpReq.get) {
        (new controller).onGet(req, res, next);
      } else if (reqType == httpReq.post) {
        (new controller).onPost(req, res, next);
      } else {
        throw new Error("For the sake of this demo, HTTP requests other than GET and POST have not been implemented.");
      }
    } catch (e) {
      next(e);
    }
  }
}

// Routes
// TODO: #4_create_factory this is a concrete implementation, can we get a factory to abstract it?
app.get('/', route(HomeController, httpReq.get));
app.post('/', route(HomeController, httpReq.post));

// Handles 404 and 500 errors
app.use((new CatchAllController()).onGet);
app.use((new ExpressErrorController()).handle);