import { Router } from "express";
import {
	createUser,
	deleteUserById,
	getUserByIdWithArticles,
	getUsers,
	updateUserById,
} from "../controllers/user.controller.js";
import { checkUserBody } from "../middlewares/user.middleware.js";

const userRouter = Router();

userRouter.route("/").get(getUsers).post(checkUserBody, createUser);

userRouter
	.route("/:id")
	.get(getUserByIdWithArticles)
	.put(updateUserById)
	.delete(deleteUserById);

export default userRouter;
