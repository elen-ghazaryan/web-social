import express from "express";
import userController from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../services/upload.js";

export const userRouter = express.Router()


userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)

userRouter.use(isAuthenticated)

userRouter.get("/user", userController.getUser)
userRouter.patch("/username", userController.updateUsername)
userRouter.patch("/user/avatar", upload.single("avatar"), userController.uploadAvatar)
userRouter.patch("/user/privacy", userController.switchPrivacy)