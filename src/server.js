import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import postingsRouter from "./routers/postingsRouter";
import userRouter from "./routers/userRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(morgan("dev"));

// req.body가 undefined인 문제 해결용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/postings", postingsRouter);
app.use("/", globalRouter);

export default app;
