import express from "express";
import {
  deleteAccount,
  getEdit,
  postEdit,
  logout,
  see,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/deleteAccount", deleteAccount);
userRouter.get("/logout", logout);
userRouter.get("/:id", see);

export default userRouter;
