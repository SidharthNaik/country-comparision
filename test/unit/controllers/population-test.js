const app = require('../../../src/server.js');
const config = require('../../../src/config');
const request = require('supertest');
const sinon = require('sinon');
require('chai').should();

const populationHelper = require('../../../src/lib/population-helper');
const mockPopulation = require('../../fixtures/data/mock-population.json');

describe('population endpoint tests', () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe('get country population', function getpopulation() {
    const endpointUrl = config.routes.controllerRootUrl + '/v1/population';

    it('should return a list of countries', function handleGettingPopulation(done) {
      sandbox.stub(populationHelper, 'getCountriesPopulation').returns(mockPopulation);

      request(app)
        .get(`${endpointUrl}`)
        .query({ country: 'India' })
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body.should.eql(mockPopulation);
          return done();
        });
    });

    it('should return empty array if no countries found', function handleNoCountriesFound(done) {
      sandbox.stub(populationHelper, 'getCountriesPopulation').returns([]);

      request(app)
        .get(`${endpointUrl}`)
        .query({ country: 'India' })
        .set('accept', 'application/json')
        .expect(200, [])
        .end((err) => {
          if (err) {
            return done(err);
          }
          return done();
        });
    });

    it('should return 500 if error getting countries', function handleErrorGettingCountries(done) {
      const error = new Error('fake error');
      sandbox.stub(populationHelper, 'getCountriesPopulation').throws(error);

      request(app)
        .get(`${endpointUrl}`)
        .query({ country: 'India' })
        .set('accept', 'application/json')
        .expect(500)
        .end((err) => {
          if (err) {
            return done(err);
          }
          return done();
        });
    });
  });
});
