import express from "express";
import { search, showMainPostings } from "../controllers/postingsController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", showMainPostings); // postingsController
globalRouter.get("/join", join); // userController
globalRouter.get("/login", login); // userController

export default globalRouter;
