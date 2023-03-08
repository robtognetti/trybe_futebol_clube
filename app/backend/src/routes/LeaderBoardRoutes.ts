import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/home', (req: Request, res: Response) =>
  LeaderBoardController.getLeaderBoard(req, res));

leaderBoardRoutes.get('/away', (req: Request, res: Response) =>
  LeaderBoardController.getLeaderBoardAway(req, res));

export default leaderBoardRoutes;
