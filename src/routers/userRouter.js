import express from "express";
import {
  deleteAccount,
  edit,
  logout,
  see,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/deleteAccount", deleteAccount);
userRouter.get("/logout", logout);
userRouter.get("/:id", see);

export default userRouter;
