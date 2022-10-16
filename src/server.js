import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 4000;

app.use(morgan("dev"));

const globalRouter = express.Router();
const userRouter = express.Router();
const postingsRouter = express.Router();

app.use("/users", userRouter);
app.use("/postings", postingsRouter);
app.use("/", globalRouter);

app.listen(PORT, () => {
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
});
