import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config  from '@config/config';

export interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); 
  }

  jwt.verify(token, config.AUTH_SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}