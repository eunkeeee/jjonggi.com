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

postingsRouter.get("/:id(\\d+)", showPosting);
postingsRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
postingsRouter.route("/upload").get(getUpload).post(postUpload);
postingsRouter.get("/:id(\\d+)/delete", deletePosting);

export default postingsRouter;
