import { Request, Response, NextFunction } from "express";

const handler =
  (cb: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default handler;
