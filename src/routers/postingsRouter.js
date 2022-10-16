import express from "express";

const postingsRouter = express.Router();

const handleSee = (req, res) => {
  return res.send("See");
};

postingsRouter.get("/see", handleSee);

export default postingsRouter;
