import { Request, Response, NextFunction } from 'express';

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }

  const validateEmail = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i;

  if (!validateEmail.test(email) || password.length < 6) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  return next();
}

export default validateLogin;
