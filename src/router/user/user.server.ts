import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { throwError } from "../../common/function";
import { Prisma, PrismaClient } from "@prisma/client";
import { errorMsg, httpCode, jwtType, successMsg } from "../../common/const";

const saltRound = Number(process.env.SALT_ROUND) || 6;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const prisma = new PrismaClient();

export default {
  /**
   *Login user to server. Request user info
   *{email, password} in req.body
   */
  userLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { password, ...user } = req.body.user;
    console.log(user);
    const findedUser = await prisma.user.findUnique({ where: user });
    if (!findedUser)
      return throwError(errorMsg.USER_NOT_FOUND, httpCode.NOT_FOUND, user);
    const check = await bcrypt.compare(password, findedUser.hash);
    if (!check)
      return throwError(
        errorMsg.USER_WRONG_CREDENTIALS,
        httpCode.UNAUTHORIZED,
        user
      );
    const jwtRefresh = jwt.sign(
      { id: findedUser.id, type: jwtType.REFRESH_TOKEN },
      JWT_SECRET_KEY,
      {
        expiresIn: "1w",
      }
    );
    const jwtAccess = await jwt.sign(
      { id: findedUser.id, type: jwtType.ACCESS_TOKEN },
      JWT_SECRET_KEY,
      {
        expiresIn: "10m",
      }
    );
  },

  /**
   * Using to register user
   *
   * */
  userRegister: async (req: Request, res: Response, next: NextFunction) => {
    const hash = await bcrypt.hash(req.body.user.password, saltRound);
    const { password = "", ...user } = {
      ...req.body.user,
      hash: hash,
    };
    let result = await prisma.user.create({ data: user });
    res.status(httpCode.CREATED).json({
      status: httpCode.CREATED,
      message: successMsg.CREATED("USER"),
      path: req.originalUrl,
      result: {
        id: result.id,
        userName: result?.userName ?? "",
        email: result?.email,
      },
    });
  },
  /**
   *
   * */
  userAuth: (req: Request, res: Response, next: NextFunction) => {},
  userById: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });
    res.status(httpCode.OK).json({
      status: httpCode.OK,
      message: successMsg.OK,
      result: user,
    });
  },
};
