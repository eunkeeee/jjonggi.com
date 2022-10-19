import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

// user 저장 전에 pw hashing
userSchema.pre("save", async function () {
  console.log("user password:", this.password);
  this.password = await bcrypt.hash(this.password, (saltRounds = 5));
  console.log("hashed password:", this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
