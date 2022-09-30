import { Request, Response, NextFunction } from "express";
import { throwError } from "../../common/function";
import bcrypt from 'bcrypt'
import { Prisma, PrismaClient } from "@prisma/client"
import { errorMsg, httpCode, successMsg } from "../../common/const";
const saltRound = process.env.SALT_ROUND || 6
const prisma = new PrismaClient
export default {
  userLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { password, ...user } = req.body.user;
    const findedUser = await prisma.user.findUnique({ where: user })
    if (!findedUser) return throwError(errorMsg.USER_NOT_FOUND, httpCode.NOT_FOUND, user);
    const check = await bcrypt.compare(password, findedUser.hash)
    if (!check) return throwError(errorMsg.USER_WRONG_CREDENTIALS, httpCode.UNAUTHORIZED, user);
  },
  userRegister: async (req: Request, res: Response, next: NextFunction) => {
    const { password = '', ...user } = { ...req.body.user, hash: await bcrypt.hash(req.body.password, saltRound) }
    let result = await prisma.user.create({ data: user })
    res.status(httpCode.CREATED).json({
      status: httpCode.CREATED,
      message: successMsg.CREATED('USER '),
      path: req.originalUrl,
      result: {
        id: result.id,
        userName: result?.userName ?? '',
        email: result?.email
      }
    })
  },
  userAuth: (req: Request, res: Response, next: NextFunction) => { },
  userById: (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

  },
};
