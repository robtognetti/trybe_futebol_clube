import { Request, Response, NextFunction } from 'express';
import Jwt from '../utils/token';

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req
    .header('Authorization');

  if (!token) return res.status(401).send({ message: 'Token not found' });

  try {
    const tokenAuth = Jwt.verifyToken(token);

    res.locals.token = tokenAuth;

    next();
  } catch (err) {
    res.status(401).send({ message: 'Token must be a valid token' });
  }
}
