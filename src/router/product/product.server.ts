import { Request, Response, NextFunction } from "express";

import { throwError } from "../../common/function";
import { Prisma, PrismaClient } from "@prisma/client";
import { errorMsg, httpCode, jwtType, successMsg } from "../../common/const";

const prisma = new PrismaClient();
export default {
  findById: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const product = prisma.product.findUniqueOrThrow({ where: { id } });
    res.status(200).json({ result: product });
  },
  findMany: async (req: Request, res: Response, next: NextFunction) => {},
  createProduct: async (req: Request, res: Response, next: NextFunction) => {},
  updateProduct: async (req: Request, res: Response, next: NextFunction) => {},
  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {},
};
