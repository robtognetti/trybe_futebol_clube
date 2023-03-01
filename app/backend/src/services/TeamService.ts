import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  protected teamModel: ModelStatic<TeamModel> = TeamModel;

  public async findAll(): Promise<TeamModel[]> {
    const result = await this.teamModel.findAll();
    return result;
  }

  public async getById(id: number): Promise<TeamModel | null> {
    const result = await this.teamModel.findByPk(id);
    return result;
  }
}
