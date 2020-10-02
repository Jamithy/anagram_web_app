import * as Express from 'express'
import * as session from 'express-session';

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

