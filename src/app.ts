import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from 'connect-mongo';
import 'dotenv/config';
import flash from "connect-flash"

// utils
import { viewsLocation } from "./utils/viewsLocation.util";
// Node modules
import { join } from "path";
// routes
import { adminRoute } from "./routes/admin.route";
import { shopRoute } from "./routes/shop.route";
import { authRoute } from "./routes/auth.route";
import { indexRoute } from "./routes/index.route";

const PORT = 3000;
const app: Express = express();

// http://expressjs.com/en/api.html#app.set
app.set('view engine', 'pug');

// set the folder location for the views
app.set('views', viewsLocation);

// session middleware
app.use(session({
    secret: 'foo',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      dbName: process.env.DATABASE_NAME,
      stringify: false,
    }),
    /*cookie: {
      maxAge: 100_000
    }*/
}));

// connect-flash
app.use(flash());

// static files
app.use(express.static(join(__dirname, 'static')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routes
app.use('/admin', adminRoute);
app.use('/shop', shopRoute);
app.use('/user', authRoute);
app.get('/', indexRoute);

app.get('/404', (req: Request, res: Response, next: NextFunction) => {
    res.render("404");
})

app.listen(PORT, () => console.log("Server running"))