import Matches from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';
import { TeamsPointHome, TeamsPointAway, orderResults } from '../utils/leaderBoard';
import { ITeam } from '../interfaces/ITeam';

export default class LeaderBoardService {
  public static async getLeaderBoard() {
    const teams = await Team.findAll();

    const homeTeams = await teams.map(async (team) => {
      const homeMatches = await Matches.findAll(

        { where: { homeTeamId: team.id, inProgress: false } },

      );

      const statisticsHome = await homeMatches.map((match) => (
        TeamsPointHome(team.teamName, [match])));

      const statisticsTeams = statisticsHome[homeMatches.length - 1];

      return { ...statisticsTeams };
    });

    const TeamsResults = await Promise.all(homeTeams);
    const sortedTeams = orderResults(TeamsResults);

    return sortedTeams;
  }

  public static async getLeaderBoardAway() {
    const teams = await Team.findAll() as ITeam[];

    const teamsAwayStats = await Promise.all(

      teams.map(async (team) => {
        const awayTeamMatches = await Matches.findAll({

          where: { awayTeamId: team.id, inProgress: false },
        });

        const teamAwayStats = await Promise.all(

          awayTeamMatches.map((match) => TeamsPointAway(team.teamName, [match])),
        );

        const teamsAllStats = teamAwayStats[awayTeamMatches.length - 1];

        return { ...teamsAllStats };
      }),
    );
    const resultsSorted = orderResults(teamsAwayStats);

    return resultsSorted;
  }
}
