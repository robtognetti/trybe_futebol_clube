import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing endpoint', () => {

  let chaiHttpResponse: Response;
  const everyTeam = [

    {
        id: 1,
        teamName: 'Avaí/Kindermann'
    },

    {
        id: 2,
        teamName: 'Bahia'
    },

    {
        id: 3,
        teamName: 'Botafogo'
    }

  ]

  before(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves([
        {
            id: 1,
            teamName: 'Avaí/Kindermann',
          },

          {
            id: 2,
            teamName: 'Bahia',
          },
          
          {
            id: 3,
            teamName: 'Botafogo',
          },
      ] as TeamModel[]);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  })

  it('Return all teams', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.deep.equal
  });
});