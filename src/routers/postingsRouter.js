import express from "express";
import {
  deletePosting,
  edit,
  getEdit,
  postEdit,
  showPosting,
  upload,
} from "../controllers/postingsController";

const postingsRouter = express.Router();

postingsRouter.get("/:id(\\d+)", showPosting);
postingsRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
postingsRouter.get("/:id(\\d+)/delete", deletePosting);
postingsRouter.get("/upload", upload);

export default postingsRouter;
