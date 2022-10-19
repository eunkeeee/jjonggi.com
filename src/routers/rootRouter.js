import express from "express";
import { search, home } from "../controllers/postingsController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
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
