import express from "express";
import { deleteAccount, see } from "../controllers/userController";
import {
  getChangePassword,
  postChangePassword,
} from "../controllers/UsersController/changePasswordController";
import {
  getEdit,
  postEdit,
} from "../controllers/UsersController/editProfileController";
import { logout } from "../controllers/UsersController/loginController";
import { loginOnlyMiddleWare, avatarUpload } from "../middleware";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(loginOnlyMiddleWare)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(loginOnlyMiddleWare)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/deleteAccount", deleteAccount);
userRouter.get("/logout", loginOnlyMiddleWare, logout);
userRouter.get("/:id", see);

export default userRouter;
