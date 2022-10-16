import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 4000;

app.use(morgan("dev"));

app.get("/", (req, res) => res.send("hi"));
app.get("/login", (req, res) => res.send("Login"));

app.listen(PORT, () => {
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
});
