import express from "express";
import { search, home } from "../controllers/postingsController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", home); // postingsController
globalRouter.get("/join", join); // userController
globalRouter.get("/login", login); // userController
globalRouter.get("/search", search); //postingsController

export default globalRouter;
