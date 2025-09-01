import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.js";

const userRouter = Router();

userRouter.use((req, res, next) => {
  console.log("Users Router");
  next();
});

const validateRequestBody = (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email)
    return res
      .status(400)
      .json({ error: "firstName, lastName, and email are required" });

  next();
};

userRouter.route("/").get(getUsers).post(validateRequestBody, createUser);
userRouter
  .route("/:id")
  .get(getUserById)
  .put(validateRequestBody, updateUser)
  .delete(deleteUser);

export default userRouter;
