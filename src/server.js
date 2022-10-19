import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import postingsRouter from "./routers/postingsRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleWare } from "./models/middleware";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(morgan("dev"));

// req.body가 undefined인 문제 해결용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION Middleware
app.use(
  session({
    secret: process.env.COOKIE_SERCRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log("!!!SESSIONS:", sessions);
  });
  next();
});

// LOCALS middleware
app.use(localsMiddleWare);

app.use("/users", userRouter);
app.use("/postings", postingsRouter);
app.use("/", rootRouter);

export default app;
