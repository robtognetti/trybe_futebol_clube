import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

export default async function validateMatches(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { homeTeamId, awayTeamId } = req.body;
  // problemas com too many lines do lint obrigou a fazer o req.body desta forma

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .send({
        message: 'It is not possible to create a match with two equal teams',
      });
  }

  const teamService = new TeamService();

  const firstTeam = await teamService.getById(homeTeamId);

  const secondTeam = await teamService.getById(awayTeamId);

  if (!firstTeam || !secondTeam) {
    return res.status(404).send({ message: 'There is no team with such id!' });
  }
  next();
}
