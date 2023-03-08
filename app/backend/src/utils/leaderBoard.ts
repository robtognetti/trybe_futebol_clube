import { IMatches } from '../interfaces/IMatches';
import { Ileaderboard } from '../interfaces/ILeaderBoard';

const getAllTeams = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const resetTeams = () => {
  getAllTeams.totalPoints = 0;
  getAllTeams.totalGames = 0;
  getAllTeams.totalVictories = 0;
  getAllTeams.totalDraws = 0;
  getAllTeams.totalLosses = 0;
  getAllTeams.goalsFavor = 0;
  getAllTeams.goalsOwn = 0;
  getAllTeams.goalsBalance = 0;
  getAllTeams.efficiency = 0;
};

export default function calculateScore(teamaGoals: number, teambGoals: number) {
  let draw = 0;

  let losses = 0;

  let scorePoint = 0;

  let win = 0;

  if (+teamaGoals < +teambGoals) {
    losses += 1;
  } else if (+teamaGoals === +teambGoals) {
    scorePoint += 1;
    draw += 1;
  } else if (+teamaGoals > +teambGoals) {
    scorePoint += 3;
    win += 1;
  }

  return ({ draw, losses, scorePoint, win });
}

const homeVictory = (homeTeamGoals: number, awayTeamGoals: number) => {
  getAllTeams.totalPoints += 3;
  getAllTeams.totalVictories += 1;
  getAllTeams.goalsFavor += homeTeamGoals;
  getAllTeams.goalsOwn += awayTeamGoals;
};

const homeDraw = (homeTeamGoals: number, awayTeamGoals: number) => {
  getAllTeams.totalPoints += 1;
  getAllTeams.totalDraws += 1;
  getAllTeams.goalsFavor += homeTeamGoals;
  getAllTeams.goalsOwn += awayTeamGoals;
};

const homeDefeat = (homeTeamGoals: number, awayTeamGoals: number) => {
  getAllTeams.totalPoints += 0;
  getAllTeams.totalLosses += 1;
  getAllTeams.goalsFavor += homeTeamGoals;
  getAllTeams.goalsOwn += awayTeamGoals;
};

const awayVictory = (homeTeamGoals: number, awayTeamGoals: number) => {
  getAllTeams.totalPoints += 3;
  getAllTeams.totalVictories += 1;
  getAllTeams.goalsFavor += awayTeamGoals;
  getAllTeams.goalsOwn += homeTeamGoals;
};

const awayDraw = (homeTeamGoals: number, awayTeamGoals: number) => {
  getAllTeams.totalPoints += 1;
  getAllTeams.totalDraws += 1;
  getAllTeams.goalsFavor += awayTeamGoals;
  getAllTeams.goalsOwn += homeTeamGoals;
};

const awayDefeat = (homeTeamGoals: number, awayTeamGoals: number) => {
  getAllTeams.totalPoints += 0;
  getAllTeams.totalLosses += 1;
  getAllTeams.goalsFavor += awayTeamGoals;
  getAllTeams.goalsOwn += homeTeamGoals;
};

// const getTotalLosses = (homeTeamGoals: IMatches[]) => homeTeamGoals
//   .filter((matches: IMatches) => match.homeTeamGoals < matches.awayTeamGoals).length;

const homePoints = (matches: IMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) homeVictory(homeTeamGoals, awayTeamGoals); else if
    (homeTeamGoals === awayTeamGoals) homeDraw(homeTeamGoals, awayTeamGoals); else if
    (homeTeamGoals < awayTeamGoals) homeDefeat(homeTeamGoals, awayTeamGoals);
  });
};

// const getTotalVictories = (homeTeamGoals: IMatches[]) => homeTeamGoals
//  .filter((matches: IMatches) => match.homeTeamGoals > matches.awayTeamGoals).length;

const awayPoints = (matches: IMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals > homeTeamGoals) awayVictory(homeTeamGoals, awayTeamGoals); else if
    (homeTeamGoals === awayTeamGoals) awayDraw(homeTeamGoals, awayTeamGoals); else if
    (awayTeamGoals < homeTeamGoals) awayDefeat(homeTeamGoals, awayTeamGoals);
  });
};

// const getTotalDraws = (homeTeamGoals: IMatches[]) => homeTeamGoals
//   .filter((matches: IMatches) => match.homeTeamGoals === matches.awayTeamGoals).length;

const TeamsPointHome = (name: string, matches: IMatches[]) => {
  if (name !== getAllTeams.name || !name) {
    resetTeams();
  }

  getAllTeams.name = name;

  homePoints(matches);

  getAllTeams.totalGames += 1;

  getAllTeams.goalsBalance = getAllTeams.goalsFavor - getAllTeams.goalsOwn;
  // const efficiency = ((points / (results.length * 3)) * 100).toFixed(2);
  getAllTeams.efficiency = Number(
    (((getAllTeams.totalPoints / (getAllTeams.totalGames * 3)) * 100 * 100) / 100).toFixed(2),
  );

  return getAllTeams;
};

const TeamsPointAway = (name: string, matches: IMatches[]) => {
  if (name !== getAllTeams.name || !name) {
    resetTeams();
  }

  getAllTeams.name = name;

  awayPoints(matches);

  getAllTeams.totalGames += 1;

  getAllTeams.goalsBalance = getAllTeams.goalsFavor - getAllTeams.goalsOwn;

  getAllTeams.efficiency = Number(
    (((getAllTeams.totalPoints / (getAllTeams.totalGames * 3)) * 100 * 100) / 100).toFixed(2),
  );

  return getAllTeams;
};

const calculo = (n1: number, n2: number) => {
  if (n1 > n2) return 1;

  return -1;
};

const orderResults = (matches: Ileaderboard[]) => {
  matches.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;

    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;

    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;

    if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;

    return calculo(b.goalsOwn, a.goalsOwn);
  });
  return matches;
};

export { TeamsPointHome, TeamsPointAway, orderResults };
