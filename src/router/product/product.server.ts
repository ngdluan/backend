import { Request, Response, NextFunction } from "express";

import { throwError } from "../../common/function";
import { Prisma, PrismaClient } from "@prisma/client";
import { errorMsg, httpCode, jwtType, successMsg } from "../../common/const";

const prisma = new PrismaClient();
export default {
  findById: async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params, req.query)
    const id = req.params.id;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
      select: {
        name: true,
        description: true,
        Price: {
          select: {
            id: true,
            value: true,
            Attr: {
              select: {
                key: true,
                value: true
              }
            }
          }
        }
      }
    });
    res.status(200).json({ result: product });
  },
  findMany: async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, take = 50, search } = req.query;
    const products = await prisma.product.findMany({
      where: {},
      select: {
        name: true,
        description: true,
        Price: {
          select: {
            id: true,
            value: true,
            Attr: {
              select: {
                key: true,
                value: true
              }
            }
          }
        }
      },
      skip: (Number(page) - 1) * Number(take),
      take: Number(take),
    })

    res.status(httpCode.OK).json({
      page: page,
      results: products,
    })

  },
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    const product: Prisma.ProductCreateInput = req.body.product;

    const productCreated = await prisma.product.create({ data: product })

    res.status(httpCode.CREATED).json(productCreated)

  },
  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    const product: Prisma.ProductUpdateInput = req.body.product;
    const id = req.params.id;
    const productUpdate = await prisma.product.update({
      where: { id },
      data: product
    })
    res.status(httpCode.OK).json({ result: productUpdate })
  },
  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const productDelete = await prisma.product.delete({ where: { id } })
    res.status(httpCode.OK).json({ result: productDelete })
  },
};
