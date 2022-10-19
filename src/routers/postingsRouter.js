import express from "express";
import {
  deletePosting,
  getEdit,
  getUpload,
  postEdit,
  postUpload,
  showPosting,
} from "../controllers/postingsController";
import { loginOnlyMiddleWare } from "../middleware";

const postingsRouter = express.Router();

postingsRouter.get("/:id([0-9a-f]{24})", showPosting);
postingsRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(loginOnlyMiddleWare)
  .get(getEdit)
  .post(postEdit);
postingsRouter
  .route("/upload")
  .all(loginOnlyMiddleWare)
  .get(getUpload)
  .post(postUpload);
postingsRouter.get(
  "/:id([0-9a-f]{24})/delete",
  loginOnlyMiddleWare,
  deletePosting
);

export default postingsRouter;
