import { ModelStatic } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

class MatchesService {
  private model: ModelStatic<Matches> = Matches;

  public async getAllMatches(inProgress: unknown): Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const isTrue = (inProgress === 'true');
    if (isTrue) {
      return matches.filter((e) => e.inProgress === true);
    }
    const isFalse = (inProgress === 'false');
    if (isFalse) {
      return matches.filter((e) => e.inProgress === false);
    }
    return matches;
  }

  public async finishedMatch(id: number): Promise<void> {
    await this.model.findByPk(id);
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updatedMatches(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ):
    Promise<number[] | undefined> {
    return this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  public async newMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: Date,
    awayTeamGoals: string,
  )
    : Promise<Matches> {
    return this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
  }
}

export default MatchesService;
