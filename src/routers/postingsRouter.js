import express from "express";
import {
  deletePosting,
  edit,
  showPosting,
  upload,
} from "../controllers/postingsController";

const postingsRouter = express.Router();

postingsRouter.get("/:id(\\d+)", showPosting);
postingsRouter.get("/:id(\\d+)/edit", edit);
postingsRouter.get("/:id(\\d+)/delete", deletePosting);
postingsRouter.get("/upload", upload);

export default postingsRouter;
