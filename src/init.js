import "./db";
import "./models/Posting";
import "./models/User";
import app from "./server";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
});
