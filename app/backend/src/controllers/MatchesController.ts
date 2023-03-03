import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}
  // private _service: MatcheService = new MatcheService(); ? nao funcionou desta forma ?

  public async getAllMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      const matches = await this.matchesService.getAllMatches(inProgress as string);
      return res.status(200).send(matches);
    } catch (error) {
      next(error);
    }
  }

  public async finishedMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.matchesService.finishedMatch(Number(id));
      res.status(200).send({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  public async updatedMatches(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const {
      homeTeamGoals,
      awayTeamGoals,
    } = req.body;
    await this.matchesService.updatedMatches(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).send({ message: 'Placar Alterado' });
  }

  public async newMatch(req: Request, res: Response): Promise<Response | void> {
    const {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    } = req.body;
    const match = await
    this.matchesService.newMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    res.status(201).send(match);
  }
}
