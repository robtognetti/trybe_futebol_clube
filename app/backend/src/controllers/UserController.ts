import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  private service: UserService;
  constructor(_service: UserService) {
    this.service = _service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.service.login({ email, password });

    if (!token) res.status(401).send({ message: 'Invalid email or password' });
    res.status(200).send(token);
  }

  async getRole(_req: Request, res: Response) {
    const { email } = res.locals.token;
    const results = await this.service.getRole(email);

    if (!results) res.status(401).send({ message: 'Invalid email or password' });
    res.status(200).send({ role: results });
  }
}
