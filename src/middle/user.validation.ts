import { V, throwError } from "../common/function";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { httpCode, errorMsg } from "../common/const";

const userMiddle = {
  userSignUpReq: (req: Request, res: Response, next: NextFunction) => {
    const { email, userName, password } = req.body;
    new V(email, "Email").isString().isEmail();
    new V(userName, "Username").isString;
    new V(password, "Password").isString().haveNomalChar().haveUpperChar();
    console.log(process.env.SALT_ROUND);
    const hash = bcrypt.hashSync(password, Number(process.env.SALT_ROUND));
    delete req.body.password;
    req.body.hash = hash;
    next();
  },
  userSignInReq: (req: Request, res: Response, next: NextFunction) => {
    const { email, userName, password } = req.body;
    new V(email, "Email", true).isString().isEmail();
    new V(userName, "UserName", true).isString();
    new V(password, "Password").isString().haveNomalChar().haveUpperChar();
    next();
  },
  userAuthenReq: (req: Request, res: Response, next: NextFunction) => {
    const authorization: string | undefined = req.headers.authorization;
    if (!authorization)
      return throwError(
        errorMsg.NETWORK_AUTHENTICATION_REQUIRED,
        httpCode.NETWORK_AUTHENTICATION_REQUIRED
      );
    const token = authorization.split(" ")?.[1] || authorization.split(" ")[0];
    const payload = jwt.verify(token, process.env.JSON);
    if (typeof payload !== "string") {
      if (payload?.type === "Refresh") {
        // res.status(httpCode.)
      }
    }
    req.body.user = payload;
    next();
  },
};

export default userMiddle;
