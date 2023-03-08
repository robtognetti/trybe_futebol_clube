import { NextFunction, Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateToken from '../middlewares/validateToken';
import validateMatch from '../middlewares/validateMatch';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  matchesController.getAllMatches(req, res, next));
matchesRouter.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.finishedMatch(req, res, next),
);
matchesRouter.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.updatedMatches(req, res, next),
);
matchesRouter.post(
  '/',
  validateToken,
  validateMatch,
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.createdMatch(req, res, next),
);

export default matchesRouter;
