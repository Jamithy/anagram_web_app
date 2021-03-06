import * as Express from 'express'
import * as session from 'express-session';
import { Factory } from './Factory';

// Get environment variables used to determine port, development/deployment status, and so on
require("dotenv").config({ path: "../.env" });

// Top-level function exported by the express module
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

// Server
const server: any = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${server.address().port}`);
});

// Init DB (for the demo, data does not need to be persisted between the backend restarts)
initDb();

async function initDb() {
  const sqlite = Factory.createSqliteDb();
  (await sqlite).init();
}

// Serves all http requests for the server
Factory.createRouterController(app);