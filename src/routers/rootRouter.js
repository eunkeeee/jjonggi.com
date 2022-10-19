import express from "express";
import { search, home } from "../controllers/postingsController";
import {
  getJoin,
  postJoin,
} from "../controllers/UsersController/joinController";
import {
  getLogin,
  postLogin,
} from "../controllers/UsersController/loginController";
import { logOutOnlyMiddleWare } from "../middleware";

const rootRouter = express.Router();

rootRouter.get("/", home); // postingsController
rootRouter.route("/join").all(logOutOnlyMiddleWare).get(getJoin).post(postJoin); // userController
rootRouter
  .route("/login")
  .all(logOutOnlyMiddleWare)
  .get(getLogin)
  .post(postLogin); // userController
rootRouter.get("/search", search); //postingsController

export default rootRouter;
