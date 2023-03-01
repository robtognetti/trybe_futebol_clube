import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

export default class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    field: 'team_name',
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'TeamModel',
  tableName: 'teams',
});
