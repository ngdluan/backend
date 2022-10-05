import { Router, Request, Response, NextFunction } from "express";
import handler from "../../middle/handler";
import productService from "./product.server";

const productRouter = Router();

productRouter.post("/", handler(productService.createProduct));
productRouter.patch("/:id", handler(productService.updateProduct));
productRouter.delete("/:id", handler(productService.deleteProduct));
productRouter.get("/list", handler(productService.findMany));
productRouter.get("/:id", handler(productService.findById));

export default productRouter;
