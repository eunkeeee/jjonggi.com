import express from "express";
import { search, home } from "../controllers/postingsController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home); // postingsController
rootRouter.route("/join").get(getJoin).post(postJoin); // userController
rootRouter.route("/login").get(getLogin).post(postLogin); // userController
rootRouter.get("/search", search); //postingsController

export default rootRouter;
