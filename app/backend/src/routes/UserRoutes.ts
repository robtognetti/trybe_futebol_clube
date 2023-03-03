import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const userRoutes = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/',
  validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

userRoutes.get('/role', validateToken, (req: Request, res: Response) =>
  userController.getRole(req, res));

export default userRoutes;
