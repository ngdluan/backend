import { CustomError } from './../common/function/error';
import { Request, Response, NextFunction } from "express";
import { httpCode, errorMsg } from '../common/const';

const handler =
  (cb: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      cb(req, res, next);
    } catch (error: any) {
      errorHandler(error, req, res)
    }
  };

export default handler;


function errorHandler(error: CustomError, req: Request, res: Response) {
  res.status(error?.code ?? httpCode.INTERNAL_SERVER_ERROR).json({
    path: req.originalUrl,
    message: error.message ?? errorMsg.INTERNAL_SERVER_ERROR,
    details: error.details ?? "",
    status: error.code ?? httpCode.INTERNAL_SERVER_ERROR
  })
}
