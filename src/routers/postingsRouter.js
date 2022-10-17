import express from "express";
import {
  deletePosting,
  edit,
  getEdit,
  getUpload,
  postEdit,
  postUpload,
  showPosting,
} from "../controllers/postingsController";

const postingsRouter = express.Router();

postingsRouter.get("/:id([0-9a-f]{24})", showPosting);
postingsRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
postingsRouter.route("/upload").get(getUpload).post(postUpload);
postingsRouter.get("/:id([0-9a-f]{24})/delete", deletePosting);

export default postingsRouter;
