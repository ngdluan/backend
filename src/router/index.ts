import { Router } from "express";
import userRouter from "./user/user.controller";

interface RouterType {
  path: string;
  handler: Router;
}
const routers: RouterType[] = [{ path: "/api/user", handler: userRouter }];
export default routers;
