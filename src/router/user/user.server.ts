import { Request, Response, NextFunction } from "express";

export default {
  userLogin: (req: Request, res: Response, next: NextFunction) => {},
  userRegister: (req: Request, res: Response, next: NextFunction) => {},
  userAuth: (req: Request, res: Response, next: NextFunction) => {},
  userById: (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    res.json({ id });
  },
};
