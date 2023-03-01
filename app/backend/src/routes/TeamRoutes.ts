import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();

const teamController = new TeamController();

teamRouter.get('/', (req, res) => teamController.findAll(req, res));
teamRouter.get('/:id', (req, res) => teamController.getById(req, res));

export default teamRouter;
