import mongoose, { mongo } from "mongoose";

// create new db : cmd에 mongosh 들어가서 나오는 URL + /db이름
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
db.on("error", (error) => console.log("❌ DB Error", error));
db.once("open", handleOpen);
