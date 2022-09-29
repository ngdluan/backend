import { Router, Request, Response, NextFunction } from "express";
import handler from "../../middle/handler";

const userRouter = Router();

userRouter.post(
  "/login",
  handler((req: Request, res: Response, next: NextFunction) => {
    // const { userName, password, email } = req.body;
    console.log("run");
    res.json({ abc: "xyz" });
  })
);
userRouter.post("register");
userRouter.get(":id");
userRouter.get("auth");

export default userRouter;
