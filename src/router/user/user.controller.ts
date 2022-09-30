import { Router, Request, Response, NextFunction } from "express";
import handler from "../../middle/handler";
import userService from "./user.server";

const userRouter = Router();

userRouter.post("/login", handler(userService.userLogin));
userRouter.post("/register", handler(userService.userRegister));
userRouter.get("/auth", handler(userService.userAuth));
userRouter.get("/:id", handler(userService.userById));

export default userRouter;
