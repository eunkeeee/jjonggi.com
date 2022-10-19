import express from "express";
import {
  deleteAccount,
  getEdit,
  postEdit,
  logout,
  see,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { loginOnlyMiddleWare } from "../middleware";

const userRouter = express.Router();

userRouter.route("/edit").all(loginOnlyMiddleWare).get(getEdit).post(postEdit);
userRouter
  .route("/change-password")
  .all(loginOnlyMiddleWare)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/deleteAccount", deleteAccount);
userRouter.get("/logout", loginOnlyMiddleWare, logout);
userRouter.get("/:id", see);

export default userRouter;
