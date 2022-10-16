import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import postingsRouter from "./routers/postingsRouter";
import userRouter from "./routers/userRouter";

const app = express();
const PORT = 4000;

app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/postings", postingsRouter);
app.use("/", globalRouter);

app.listen(PORT, () => {
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
});
