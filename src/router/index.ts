import { Router } from "express";
import productRouter from "./product/product.controller";
import userRouter from "./user/user.controller";

interface RouterType {
  path: string;
  handler: Router;
}
const routers: RouterType[] = [
  { path: "/api/user", handler: userRouter },
  { path: "/api/product", handler: productRouter },
  // {path: "/api/post", handler: postRouter}
];
export default routers;
