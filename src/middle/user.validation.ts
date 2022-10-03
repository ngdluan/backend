import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

function userSignupRequest(req: Request, res: Response, next: NextFunction) { }

async function userAuth(req: Request, res: Response, next: NextFunction) {
  const token: string = req.headers.authorization?.split(' ')?.[1] || req.headers.authorization?.split(' ')?.[0] || '';
  const JWT_TOKEN = process.env.JWT_TOKEN || '';
  const user = jwt.verify(token, JWT_TOKEN);
  req.body.user = user;
  next();
}
