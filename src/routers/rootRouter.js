import express from "express";
import { search, home } from "../controllers/postingsController";
import { getJoin, postJoin, login } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home); // postingsController
rootRouter.route("/join").get(getJoin).post(postJoin); // userController
rootRouter.get("/login", login); // userController
rootRouter.get("/search", search); //postingsController

export default rootRouter;
