import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private teamService: TeamService = new TeamService();

  public async findAll(req: Request, res: Response): Promise<void> {
    const teams = await this.teamService.findAll();
    res.status(200).send(teams);
  }

  public async getById(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const body = await this.teamService.getById(Number(id));
    res.status(200).send(body);
  }
}
