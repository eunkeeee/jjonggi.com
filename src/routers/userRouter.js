import express from "express";

const userRouter = express.Router();

const handleEdit = (req, res) => {
  return res.send("Edit");
};

userRouter.get("/edit", handleEdit);

export default userRouter;
